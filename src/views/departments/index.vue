<template>
  <el-card class="tree-card">
    <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
    <el-tree :data="departs" :props="defaultProps">
      <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" />
    </el-tree>
    <add-dept v-if="showDialog" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </el-card>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept' // 引入新增部门组件
import {
  getDepartments
} from '@/api/departments'
export default {
  components: {
    TreeTools,
    AddDept
  },
  props: {},
  data() {
    return {
      node: {},
      showDialog: false,
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: ''
      },
      departs: [{
        name: '总裁办',
        manager: '曹操',
        children: [{
          name: '董事会',
          manager: '曹丕'
        }]
      },
      {
        name: '行政部',
        manager: '刘备'
      },
      {
        name: '人事部',
        manager: '孙权'
      }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartments() // 调用自身的方法
  },
  mounted() {},
  methods: {
    addDepts(node) {
      this.showDialog = true
      console.log(node)
      this.node = node
    },
    async getDepartments() {
      const result = await getDepartments()

      function fn(arr, pid) {
        var arr1 = []
        arr.forEach(item => {
          if (item.pid === pid) {
            var tempArr = fn(arr, item.id)
            if (tempArr.length > 0) {
              item.children = tempArr
            }
            arr1.push(item)
          }
        })
        return arr1
      }

      this.departs = fn(result.depts, '') // 需要将其转化成树形结构
      console.log(result)
    }
  }
}

</script>

<style scoped>
.tree-card {
    padding: 30px 140px;
    font-size: 14px;
}
</style>
