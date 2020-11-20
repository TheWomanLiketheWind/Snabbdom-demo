/**
 * Snabbdom 是一个虚拟DOM库，重点放在简单性，模块化，强大的功能和性能上。
 * Vue 的虚拟Dom主要使用了Snabbdom而实现的
 * @param init() 是一个高阶函数，返回patch()
 * @param h() 返回虚拟子节点 VNode, 这个函数我们在使用Vue.js的时候见过
 */
import { h, thunk, init } from 'snabbdom'
// 1. 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

// 2. 注册模块
let patch = init([style, eventlisteners])

// 3. 定义列表数组变量
let list = [
  { type: 1, title: 'The Good, the Bad andthe Ugly', text: 'A bounty hunting scam' },
  { type: 2, title: 'HHHHHHH', text: 'UUUUUU' },
  { type: 3, title: 'OOOOOO', text: 'AAAAA' },
  { type: 4, title: 'NNNNN', text: 'UUMMMMMMUUUU' },
]
// 4. 将列表循环并结合Snabbdom
let sharedNode = (dataList) => dataList.map(e => h('tr', {}, [h('td', {}, e.type),
h('td', {}, e.title),
h('td', {}, e.text),
h('td', {
  props: { id: e.title },
  on: {
    click: [delect, e.type],
  }
}, 'X')]))

// 第一个参数：标签+选择器 
// 5. 将列表插入父标签中
function view(datas) {
  return h('div', {
    style: {
      backgroundColor: '#000',
      color: 'rgb(232 232 203)',
      padding: '20px'
    }
  }, [
    h('h1', 'Top 10 movies'),
    h('div', {
      style: {
        display: 'flex'
      }
    }, [
      h('div', 'Sort by:'),
      h('ul', {
        style: {
          listStyleType: 'none',
          display: 'flex',
          margin: '0'
        }
      }, [
        h('li', { style: { marginRight: '10px', color: '#908a8a' }, on: { click: [sortFn, 'Rank'] } }, 'Rank'),
        h('li', { style: { marginRight: '10px', color: '#908a8a' }, on: { click: [sortFn, 'Title'] } }, 'Title'),
        h('li', { style: { marginRight: '10px', color: '#908a8a' }, on: { click: [sortFn, 'Description'] } }, 'Description'),
      ]),
    ]),
    h('div', {
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '20px'
      },
      on: {
        click: addFn
      }
    }, 'add'),
    h('table', {
      style: { width: '100%' }
    }, [...sharedNode(datas)]),
  ])
}
// 6. 获得渲染的Dom
let app = document.querySelector('#app')

// 7. 利用Snabbdom 的patch方法 将列表 绑定到 App Dom 上
let oldNvode = patch(app, view(list))

/**新增列表的方法 */
function addFn() {
  list.push({ type: list.length + 1, title: 'BBBBB', text: 'TTTT' })
  oldNvode = patch(oldNvode, view(list))
}
/**删除具体列表的方法 */
function delect(id) {
  const index = list.findIndex(e => e.type === id)
  list.splice(index, 1)
  oldNvode = patch(oldNvode, view(list))
}
/**Sort 排序 */
function sortFn(type) {
  switch (type) {
    case 'Rank':
      list.reverse()
      oldNvode = patch(oldNvode, view(list))
      break;
    case 'Title':
      list.reverse()
      oldNvode = patch(oldNvode, view(list))
      break;
    default:
      list.reverse()
      oldNvode = patch(oldNvode, view(list))
      break;
  }
}