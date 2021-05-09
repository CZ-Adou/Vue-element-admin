// Vue.directive('指令名字',{
//   bind,//属性指令和元素结合
//   inserted,//元素插入到父元素
//   update//当前所在的元素的data值变了的时候
// })
// v-imageerror = '图片的默认值'

export const imageerror = {
  inserted(el, binding) {
    el.onerror = function() {
      el.src = binding.value
    }
  }
}

