import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 只要有这三行代码，我们以后的svg图标只要丢到我们的svg目录中，就可以直接使用，不用再使用require或import导入
// 自动导入

// webpack提供的api context是上下文的意思
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 以上代码是将所有的 svg目录下的.svg后缀文件全部引入到项目中

