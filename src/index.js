import Vue from 'vue';

let params = {
    name: 'height',
    wrapperClass: 'el-table__body-wrapper'
};

function reset(el, binding) {
    
    Vue.prototype.$nextTick(() => {
        
        let wrapperClass = params.wrapperClass;
        let wrapper = el.getElementsByClassName(wrapperClass)[0]
        let node = wrapper;
        
        let offsetTop = 0;
        while (node) {
            offsetTop += node.offsetTop;
            node = node.offsetParent;
        };

        let clientHeight = document.getElementsByTagName('body')[0].clientHeight;

        wrapper.style.height = (clientHeight - offsetTop - binding.value) + 'px';
    })
}

function inserted(el, binding) {
    reset(el, binding)
    window.addEventListener('resize', reset.bind(null, el, binding), false)
}

function unbind(el, binding) {
    window.removeEventListener('resize', reset.bind(null, el, binding), false)
}

const  hookFn = {
    inserted: (el, binding) => inserted(el, binding),
    unbind: (el, binding) => unbind(el, binding),
}

export default {
    install(Vue, options = {}) {
        params = {...params, ...options};
        Vue.directive(params.name, hookFn);
    }
}