<template>
  <div>
    <p align="center"><font color="black" size="12">课程知识图谱编辑</font></p>

    <div id="node-popUp">
      <span id="node-operation">node</span> <br>
      <table style="margin:auto;">
        <tbody>
          <!-- <tr>
            <td>id</td>
            <td><input id="node-id" value=""></td>
          </tr> -->
          <tr>
            <td>名称</td>
            <td><input id="node-label" value=""></td>
          </tr>
        </tbody>
      </table>
      <input id="node-saveButton" type="button" value="save">
      <input id="node-cancelButton" type="button" value="cancel">
    </div>

    <div id="edge-popUp">
      <span id="edge-operation">edge</span> <br>
      <table style="margin:auto;">
        <tbody>
          <tr>
            <td>关联</td>
            <td><input id="edge-label" value="new value"></td>
          </tr>
        </tbody>
      </table>
      <input id="edge-saveButton" type="button" value="save">
      <input id="edge-cancelButton" type="button" value="cancel">
    </div>

    <br>
    <div id="mynetwork" />
    <div>
      <el-input v-model="kgcode" type="textarea" rows="8" />
    </div>
  </div>
</template>
<script>
// import { Network } from 'vue2vis'
// import { Timeline, Graph2d, Network } from 'vue2vis'
require('vis/dist/vis-network.min.css')
const Vis = require('vis/dist/vis-network.min.js')
import { editKG } from '@/api/hwexp'
// import Vis from
// import Vis from 'vis'
export default {
  data: () => ({
    editshow: false,
    kgcode: '',
    edittype: '',
    nodeid: '',
    nodelabel: '',
    locales: {
	    cn: {// 工具栏中文翻译
        edit: '编辑图谱',
        del: '删除当前知识点或关联',
        back: '返回',
        addNode: '添加知识点',
        addEdge: '添加关联',
        editNode: '编辑知识点',
        editEdge: '编辑关联',
        addDescription: '点击空白处可添加知识点',
        edgeDescription: '点击某个知识点拖拽连线可连接另一个知识点',
        editEdgeDescription: '可拖拽连线改变关联',
        createEdgeError: 'Cannot link edges to a cluster.',
        deleteClusterError: 'Clusters cannot be deleted.',
        editClusterError: 'Clusters cannot be edited.'
	    }
	  },
    netdata: { nodes: [
      { id: 1, label: '节点 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }

    ],
    edges: [

    ] },
    network: null
  }),
  mounted() {
    // window.addEventListener('load', () => {
    //   this.init()
    // })
    this.getdata()
    
  },
  methods: {
    getdata() {
      const that = this
      const data = { 'userno': localStorage.getItem('userno') }
      editKG(data).then(response => {
        that.netdata = response.data.graph
        console.log('getdata',that.netdata)
        this.draw()
        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })
    },
    destroy() {
      if (this.network !== null) {
        this.network.destroy()
        this.network = null
      }
    },
    draw() {
      const that = this
      console.log(that.netdata)
      this.destroy()
      // create a network
      var container = document.getElementById('mynetwork')
      var options = {
        autoResize: false,
	      interaction: {
	              hover: true
	            },

        locale: 'cn',
        locales: this.locales,
        nodes: {
          color: '#00ff00',
          fixed: false,

          scaling: {
            label: true
          },
          shadow: true
        },

        manipulation: {
          enabled: true,
	        initiallyActive: true, // 直接显示工具栏
          addNode: function(data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = '添加知识点'
            console.log('addNode', data)
            that.editNode(data, that.clearNodePopUp, callback)
          },

          editNode: function(data, callback) {
            // filling in the popup DOM elements
            document.getElementById('node-operation').innerHTML = 'Edit Node'

            that.editNode(data, that.cancelNodeEdit, callback)
          },
          addEdge: function(data, callback) {
            if (data.from === data.to) {
              var r = confirm('Do you want to connect the node to itself?')
              if (r !== true) {
                callback(null)
                return
              }
            }
            document.getElementById('edge-operation').innerHTML = 'Add Edge'

            that.editEdgeWithoutDrag(data, callback)
          },
          editEdge: {
            editWithoutDrag: function(data, callback) {
              document.getElementById('edge-operation').innerHTML = 'Edit Edge'

              that.editEdgeWithoutDrag(data, callback)
            }
          }
        }
      }
      console.log('draw', that.netdata)
      that.network = new Vis.Network(container, that.netdata, options)
    },
    editNode(data, cancelAction, callback) {
      // data.label = document.getElementById('node-label').value
      // console.log(data)
      document.getElementById('node-label').value = data.label
      document.getElementById('node-saveButton').onclick = this.saveNodeData.bind(
        this,
        data,
        callback
      )
      document.getElementById('node-cancelButton').onclick = cancelAction.bind(
        this,
        callback
      )
      document.getElementById('node-popUp').style.display = 'block'
      console.log('editnode', data)
    },
    saveNodeData(data, callback) {
      data.label = document.getElementById('node-label').value
      console.log('savenodedata', data)
      this.kgcode = data.label
      this.clearNodePopUp()
      callback(data)
    },
    clearNodePopUp() {
      document.getElementById('node-saveButton').onclick = null
      document.getElementById('node-cancelButton').onclick = null
      document.getElementById('node-popUp').style.display = 'none'
    },

    cancelNodeEdit(callback) {
      this.clearNodePopUp()
      callback(null)
    },

    editEdgeWithoutDrag(data, callback) {
      // filling in the popup DOM elements
      document.getElementById('edge-label').value = data.label
      console.log(data)
      // data.label = document.getElementById('edge-label').value
      document.getElementById('edge-saveButton').onclick = this.saveEdgeData.bind(
        this,
        data,
        callback
      )

      document.getElementById('edge-cancelButton').onclick = this.cancelEdgeEdit.bind(
        this,
        callback
      )
      document.getElementById('edge-popUp').style.display = 'block'
    },
    clearEdgePopUp() {
      document.getElementById('edge-saveButton').onclick = null
      document.getElementById('edge-cancelButton').onclick = null
      document.getElementById('edge-popUp').style.display = 'none'
    },
    cancelEdgeEdit(callback) {
      this.clearEdgePopUp()
      callback(null)
    },
    saveEdgeData(data, callback) {
      if (typeof data.to === 'object') data.to = data.to.id
      if (typeof data.from === 'object') data.from = data.from.id
      data.label = document.getElementById('edge-label').value
      this.clearEdgePopUp()
      callback(data)
    },

    init() {
      // this.setDefaultLocale()
      this.draw()
    }

  }
}
</script>
<style scoped>
select {
  font: 10pt sans;
}
#mynetwork {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid lightgray;
}
table.legend_table {
  font-size: 11px;
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
}
table.legend_table,
td {
  border-width: 1px;
  border-color: #d3d3d3;
  border-style: solid;
  padding: 2px;
}
div.table_content {
  width: 80px;
  text-align: center;
}
div.table_description {
  width: 100px;
}

#operation {
  font-size: 28px;
}
#node-popUp {
  display: none;
  position: absolute;
  top: 350px;
  left: 170px;
  z-index: 299;
  width: 250px;
  height: 120px;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 3px;
  border-color: #5394ed;
  padding: 10px;
  text-align: center;
}
#edge-popUp {
  display: none;
  position: absolute;
  top: 350px;
  left: 170px;
  z-index: 299;
  width: 250px;
  height: 90px;
  background-color: #f9f9f9;
  border-style: solid;
  border-width: 3px;
  border-color: #5394ed;
  padding: 10px;
  text-align: center;
}
</style>
