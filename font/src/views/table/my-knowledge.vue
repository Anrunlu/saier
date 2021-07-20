<template>
  <div class="wrapper">
    <h2>知识图谱编辑</h2>
    <el-input v-model="searchTerm" style="width:30%" placeholder="请填写要查找的知识点"  class="handle-input mr10" @keyup.enter.native="findConTerm"  />
    <el-button icon="el-icon-edit" type="primary" @click="findConTerm">查询知识点</el-button>
    <!-- <el-button icon="el-icon-edit" type="warning" @click="singleKnowledge">{{ showModel }}</el-button> -->

    <network
      ref="network"
      class="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      @click="sgFindConTerm"
      @double-click="dbFindConTerm"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="selNode"
      @select-edge="selEdge"
      @deselect-node="networkEvent('deselectNode')"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('drag-start')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('drag-end')"
      @hover-node="networkEvent('hoverNode')"
      @blur-node="networkEvent('blurNode')"
      @hover-edge="networkEvent('hoverEdge')"
      @blur-edge="networkEvent('blurEdge')"
      @zoom="networkEvent('zoom')"
      @show-popup="networkEvent('showPopup')"
      @hide-popup="networkEvent('hidePopup')"
      @start-stabilizing="networkEvent('startStabilizing')"
      @stabilization-progress="networkEvent('stabilizationProgress')"
      @stabilization-iterations-done="
        networkEvent('stabilizationIterationsDone')
      "
      @stabilized="networkEvent('stabilized')"
      @resize="networkEvent('resize')"
      @init-redraw="networkEvent('initRedraw')"
      @before-drawing="networkEvent('beforeDrawing')"
      @after-drawing="networkEvent('afterDrawing')"
      @animation-finished="networkEvent('animationFinished')"
      @config-change="networkEvent('configChange')"
      @nodes-mounted="networkEvent('nodes-mounted')"
      @nodes-add="networkEvent('nodes-add')"
      @nodes-update="networkEvent('nodes-editnode')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')"
    />
    <div v-show="teaEnable">
      <el-button icon="el-icon-edit" type="primary" @click="addNode">添加知识点</el-button>
      <el-button icon="el-icon-edit" type="success" @click="editNode">编辑知识点</el-button>
      <el-button icon="el-icon-edit" type="danger" @click="removeNode">删除知识点</el-button>
      <el-button icon="el-icon-edit" type="primary" @click="addEdge">添加关联</el-button>
      <el-button icon="el-icon-edit" type="success" @click="editEdge">编辑关联</el-button>
      <el-button icon="el-icon-edit" type="danger" @click="removeEdge">删除关联</el-button>

      <el-dialog title="添加知识点" :visible.sync="conEditFlag">
        <el-autocomplete
          v-model="selConValue"
          class="inline-input"
          :fetch-suggestions="getConTerm"
          placeholder="请输入内容"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="conEditFlag = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddNode">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加关联" :visible.sync="relEditFlag">
        <el-autocomplete
          v-model="selRelValue"
          class="inline-input"
          :fetch-suggestions="getRelTerm"
          placeholder="请输入内容"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="relEditFlag = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddEdge">确 定</el-button>
        </div>
      </el-dialog>

      <hr>
      <div>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-input v-model="concode" type="textarea" rows="8" placeholder="概念" />
          </el-col>
          <el-col :span="8">
            <el-input v-model="relcode" type="textarea" rows="8" placeholder="关系" />
          </el-col>
          <el-col :span="8">
            <el-input v-model="kgcodeAll" type="textarea" rows="8" placeholder="知识点关联" />
          </el-col>
        </el-row>
        <el-row>
          <el-button type="primary" @click="submitKgCode">提交知识图谱代码</el-button>
        </el-row>
        <el-row>
          <el-input v-model="resinfo" type="textarea" rows="8" placeholder="后台反馈" />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import { Network } from 'vue2vis'
import { fuzzFindConterm, editKG, fuzzFindRelterm, submitKgCode } from '@/api/hwexp'
// import { Timeline, Graph2d, Network } from 'vue2vis'
import 'vue2vis/dist/vue2vis.css'
export default {
  name: 'Kgedit',
  components: {
    // Timeline,
    // Graph2d,
    Network
  },
  data() {
    return {
      teaEnable: false,
      nodeForEdgeAdd: [],
      addOrEdit: '',
      conform: {},
      newConTerm: '',
      newRelTerm: '',
      selNodes: '',
      selEdges: '',
      sgclick: false,
      searchTerm: '',
      selConValue: '',
      selRelValue: '',
      conterms: [],
      conEditFlag: false,
      relEditFlag: false,
      frontOrBack: true,
      concode: '',
      relcode: '',
      kgcode: '',
      kgcodelist: [],
      kgcodeAll: '',
      resinfo: '',
      conlist: [],
      rellist: [],
      nodeData: '',
      networkEvents: '',
      network: {

        nodes: [{id:1,label:'请在搜索框输入要查询的知识点'}],
        edges: [],
        options: {
          interaction: {
            multiselect: true, // 按 ctrl 多选
            //     dragNodes:false,//是否能拖动节点
            //  dragView:false,//是否能拖动画布
            //  hideEdgesOnDrag:true,//拖动画布时是否隐藏连接线
            //  hideNodesOnDrag:true,//拖动画布时是否隐藏节点
            hover: true // 鼠标移过后加粗该节点和连接线
            //  keyboard:true,//

            // navigationButtons: true// 是否显示控制按钮
            //  selectable:false,//是否可以点击选择
            //  selectConnectedEdges:false,//选择节点后是否显示连接线
            //  hoverConnectedEdges:false,//鼠标滑动节点后是否显示连接线
            //  tooltipDelay:200
            //  zoomView:true//是否能缩放画布
          },
          // locale: 'cn', // 工具栏显示中文
          // locales: {
          //   cn: {// 工具栏中文翻译
          //     edit: '编辑',
          //     del: '删除当前知识点或关联',
          //     back: '返回',
          //     addNode: '添加知识点',
          //     addEdge: '添加关联',
          //     editNode: '编辑知识点',
          //     editEdge: '编辑关联',
          //     addDescription: '点击空白处可添加知识点',
          //     edgeDescription: '点击某个知识点拖拽连线可连接另一个知识点',
          //     editEdgeDescription: '可拖拽连线改变知识点关联',
          //     createEdgeError: 'Cannot link edges to a cluster.',
          //     deleteClusterError: 'Clusters cannot be deleted.',
          //     editClusterError: 'Clusters cannot be edited.'
          //   }
          // },
          // manipulation: {
          //   enabled: true,
          //   initiallyActive: false,
          //   addNode: true,
          // addEdge: true
          //   editNode: true,
          //   editEdge: true,
          //   deleteNode: true,
          //   deleteEdge: true,
          //   controlNodeStyle: {
          //   // all node options are valid.
          //   }
          // },

          nodes: {
          // fixed: true,

            shape: 'box'
          }
        }
      }
    }
  },
  mounted() {
    if (localStorage.getItem('type') === 'tea') {
      this.teaEnable = true
    } else {
      this.teaEnable = false
    }
  },
  methods: {

    submitKgCode() {
      if (this.kgcodeAll) {
        var kgcdlst = this.kgcodeAll.split('\n')
        var con = []
        var rel = []
        for (let i = 0; i < kgcdlst.length; i++) {
          if (kgcdlst[i].indexOf('+=') !== -1) {
            var tempkgcd = kgcdlst[i].split('+=')
            var tempcr = tempkgcd[0].split('.')
            if (con.indexOf(tempcr[0].trim()) === -1) {
              con.push(tempcr[0].trim())
            }
            if (rel.indexOf(tempcr[1].trim()) === -1) {
              if ((tempcr[1].trim() !== 'child') && (tempcr[1].trim() !== 'ins')) { rel.push(tempcr[1].trim()) }
            }
            var temptri = tempkgcd[1].trim().split(' ')
            for (let j = 0; j < temptri.length; j++) {
              if (con.indexOf(temptri[j].trim()) === -1) {
                con.push(temptri[j].trim())
              }
            }
          } else if (kgcdlst[i].trim().indexOf('=') !== -1) {
            console.log(kgcdlst[i].trim().split('='))
          }
        }
        var tempcon = '概念+='
        for (let m = 0; m < con.length; m++) {
          tempcon = tempcon + con[m] + ' '
        }
        this.concode = tempcon.trim()
        var temprel = '关系+='
        for (let n = 0; n < rel.length; n++) {
          temprel = temprel + rel[n] + ' '
        }
        this.relcode = temprel.trim()
      }
      var code = this.concode + '\n' + this.relcode + '\n' + this.kgcodeAll

      const data = { 'kgcode': code, 'userno': localStorage.getItem('userno') }
      submitKgCode(data).then(response => {
        this.resinfo = response.data + '\n' + '-------------------'
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    selNode(e) {
      this.selNodes = e.nodes
      if (this.nodeForEdgeAdd.length < 2) {
        this.nodeForEdgeAdd.push(e.nodes[0])
      } else {
        this.nodeForEdgeAdd[0] = this.nodeForEdgeAdd[1]
        this.nodeForEdgeAdd[1] = e.nodes[0]
      }
      console.log('nodes', this.nodeForEdgeAdd)
    },
    selEdge(e) {
      this.selEdges = e.edges
      console.log('edges', this.selEdges)
    },
    confirmAddNode() {
      const _this = this
      const data = { 'userno': localStorage.getItem('userno'), 'conterm': _this.selConValue }

      editKG(data).then(response => {
        // this.tableData = response.data

        if (response.data.graph.nodes.length === 0) { // 如果该知识点后台没有，则新建
          if (_this.addOrEdit) {
            if (_this.conlist.indexOf(_this.selConValue) <= -1) {
              const id = new Date().getTime()
              _this.network.nodes.push({ id, label: _this.selConValue })
              _this.conlist.push(_this.selConValue)
            }
            _this.conEditFlag = false
          } else {
            if (_this.conlist.indexOf(_this.selConValue) <= -1) {
              console.log(_this.conlist)
              _this.network.nodes.forEach(function(item) {
                if (item.id === _this.selNodes[0]) {
                  console.log(item.id, item.label, _this.selNodes[0])
                  _this.conlist.splice(_this.conlist.indexOf(item.label), 1)
                  item.label = _this.selConValue
                  _this.conlist.push(item.label)
                }
              })
              _this.conEditFlag = false
              _this.kgcode = this.kgcode + _this.selConValue
              _this.kgcodeAll = ''
              _this.kgcodelist.push(_this.kgcode)
              for (var kg = 0; kg < _this.kgcodelist.length; kg++) {
                _this.kgcodeAll = _this.kgcodeAll + _this.kgcodelist[kg] + '\n'
              }
            }
          }
          var tempstr = ''
          for (var idx in _this.conlist) {
            tempstr = tempstr + _this.conlist[idx] + ' '
          }

          _this.concode = '概念+=' + tempstr
        } else {
          _this.$message('库中已存在该知识点')
          for (var idx1 in response.data.graph.nodes) {
            var tempflag = false
            for (var idx2 in _this.network.nodes) { // 如果有这个知识点，则视图中存在，则更新视图中的知识点信息
              if (response.data.graph.nodes[idx1].id === _this.network.nodes[idx2].id) {
                _this.network.nodes.splice(idx2, 1, response.data.graph.nodes[idx1])
                // delete _this.network.nodes[idx2]
                // _this.network.nodes.push(response.data.graph.nodes[idx1])
                tempflag = true
                break
              }
            }
            if (tempflag === false) {
              _this.network.nodes.push(response.data.graph.nodes[idx1])
            }
          }
          for (idx1 in response.data.graph.edges) {
            tempflag = false
            for (idx2 in _this.network.edges) {
              if (response.data.graph.edges[idx1].id === _this.network.edges[idx2].id) {
                _this.network.edges.splice(idx2, 1, response.data.graph.edges[idx1])
                // delete _this.network.nodes[idx2]
                // _this.network.nodes.push(response.data.graph.nodes[idx1])
                tempflag = true
                break
              }
            }
            if (tempflag === false) {
              _this.network.edges.push(response.data.graph.edges[idx1])
            }
          }

          _this.conEditFlag = false
        }

        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    confirmAddEdge() {
      const _this = this
      if (_this.addOrEdit) {
        var templist = []
        for (var i = 0; i < _this.conform.length; i++) {
          templist.push(_this.conform[i].value)
        }
        if ((_this.rellist.indexOf(_this.selRelValue) <= -1) && (templist.indexOf(_this.selRelValue) <= -1)) {
          _this.rellist.push(_this.selRelValue)
          var tempstr = ''
          for (var idx in _this.rellist) {
            tempstr = tempstr + _this.rellist[idx] + ' '
          }
          _this.relcode = '关系+=' + tempstr
        }
        _this.network.edges.push({
          id: `${_this.nodeForEdgeAdd[0]}-${_this.nodeForEdgeAdd[1]}`,
          from: _this.nodeForEdgeAdd[0],
          to: _this.nodeForEdgeAdd[1],
          label: _this.selRelValue
        })

        for (var m = 0; m < _this.network.nodes.length; m++) {
          if (_this.nodeForEdgeAdd[0] === _this.network.nodes[m].id) {
            var n0 = _this.network.nodes[m].label
            break
          }
        }
        for (m = 0; m < _this.network.nodes.length; m++) {
          if (_this.nodeForEdgeAdd[1] === _this.network.nodes[m].id) {
            var n1 = _this.network.nodes[m].label
            break
          }
        }
        _this.kgcode = ''
        _this.kgcode = _this.kgcode + n0 + '.' + _this.selRelValue + '+=' + n1
        _this.kgcodeAll = ''
        _this.kgcodelist.push(_this.kgcode)
        for (var kg = 0; kg < _this.kgcodelist.length; kg++) {
          _this.kgcodeAll = _this.kgcodeAll + _this.kgcodelist[kg] + '\n'
        }

        _this.relEditFlag = false
      } else {
        templist = []
        for (i = 0; i < _this.conform.length; i++) {
          templist.push(_this.conform[i].value)
        }
        if ((_this.rellist.indexOf(_this.selRelValue) <= -1) && (templist.indexOf(_this.selRelValue) <= -1)) {
          _this.rellist.push(_this.selRelValue)
          tempstr = ''
          for (idx in _this.rellist) {
            tempstr = tempstr + _this.rellist[idx] + ' '
          }
          _this.relcode = '关系+=' + tempstr
        }
        _this.network.edges.forEach(function(item) {
          console.log(item, _this.selEdges[0])
          if (item.id === _this.selEdges[0]) {
            item.label = _this.selRelValue
          }
        })
        for (m = 0; m < _this.network.nodes.length; m++) {
          if (_this.nodeForEdgeAdd[0] === _this.network.nodes[m].id) {
            n0 = _this.network.nodes[m].label
            break
          }
        }
        for (m = 0; m < _this.network.nodes.length; m++) {
          if (_this.nodeForEdgeAdd[1] === _this.network.nodes[m].id) {
            n1 = _this.network.nodes[m].label
            break
          }
        }
        _this.kgcode = _this.kgcode + n0 + '.' + _this.selRelValue + '+=' + n1 + '\n'
        _this.relEditFlag = false
      }
    },
    dbFindConTerm() {
      for (var i = 0; i < this.network.nodes.length; i++) {
        if (this.network.nodes[i].id === this.selNodes[0]) {
          this.searchTerm = this.network.nodes[i].label
          break
        }
      }
      this.sgclick = false
      this.findConTerm()
    },
    sgFindConTerm() {
      for (var i = 0; i < this.network.nodes.length; i++) {
        if (this.network.nodes[i].id === this.selNodes[0]) {
          this.searchTerm = this.network.nodes[i].label
          break
        }
      }
      this.sgclick = true
      this.findConTerm()
    },
    findConTerm() {
      const _this = this
      const data = { 'userno': localStorage.getItem('userno'), 'conterm': _this.searchTerm }
      editKG(data).then(response => {
        // this.tableData = response.data
        if (_this.sgclick) {
          for (var idx1 in response.data.graph.nodes) {
            var tempflag = false
            for (var idx2 in _this.network.nodes) {
              if (response.data.graph.nodes[idx1].id === _this.network.nodes[idx2].id) {
                _this.network.nodes.splice(idx2, 1, response.data.graph.nodes[idx1])
                // delete _this.network.nodes[idx2]
                // _this.network.nodes.push(response.data.graph.nodes[idx1])
                tempflag = true
                break
              }
            }
            if (tempflag === false) {
              _this.network.nodes.push(response.data.graph.nodes[idx1])
            }
          }
          for (idx1 in response.data.graph.edges) {
            tempflag = false
            for (idx2 in _this.network.edges) {
              if (response.data.graph.edges[idx1].id === _this.network.edges[idx2].id) {
                _this.network.edges.splice(idx2, 1, response.data.graph.edges[idx1])
                // delete _this.network.nodes[idx2]
                // _this.network.nodes.push(response.data.graph.nodes[idx1])
                tempflag = true
                break
              }
            }
            if (tempflag === false) {
              _this.network.edges.push(response.data.graph.edges[idx1])
            }
          }
        } else {
          _this.network = response.data.graph
        }

        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getConTerm(query, cb) {
      const _this = this
      query = _this.selConValue
      const data = { 'userno': localStorage.getItem('userno'), 'conterm': query }
      fuzzFindConterm(data).then(response => {
        // this.tableData = response.data
        _this.conform = response.data
        cb(_this.conform)
        // _this.conEditFlag = false
        console.log(_this.network.nodes.length)
        if (_this.network.nodes.length === 0) {
          _this.newConTerm = _this.selConValue
          console.log('termname', _this.newConTerm)
        }

        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getRelTerm(query, cb) {
      const _this = this
      query = _this.selRelValue
      const data = { 'userno': localStorage.getItem('userno'), 'relterm': query }
      fuzzFindRelterm(data).then(response => {
        // this.tableData = response.data
        _this.conform = response.data
        cb(_this.conform)
        // _this.conEditFlag = false

        if (_this.network.edges.length === 0) {
          _this.newRelTerm = _this.selRelValue
          console.log('termname', _this.newRelTerm)
        }

        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    addNode() {
      this.conEditFlag = true
      this.addOrEdit = true
    },
    editNode() {
      this.conEditFlag = true
      this.addOrEdit = false
      for (var m = 0; m < this.network.nodes.length; m++) {
        if (this.selNodes[0] === this.network.nodes[m].id) {
          this.selConValue = this.network.nodes[m].label
          this.kgcode = this.selConValue + '.name='
          break
        }
      }
    },
    addEdge() {
      this.relEditFlag = true
      this.addOrEdit = true
    },
    editEdge() {
      this.relEditFlag = true
      this.addOrEdit = false
      for (var m = 0; m < this.network.edges.length; m++) {
        console.log(this.selEdges[0], this.network.edges[m].id)
        if (this.selEdges[0] === this.network.edges[m].id) {
          this.selRelValue = this.network.edges[m].label
          break
        }
      }
    },
    resetNetwork() {
      this.network = {
        nodes: [],
        edges: [],
        options: {}
      }
    },
    removeNode() {
      for (var m = 0; m < this.network.nodes.length; m++) {
        if (this.selNodes[0] === this.network.nodes[m].id) {
          this.selConValue = this.network.nodes[m].label
          break
        }
      }
      if (this.conlist.indexOf(this.selConValue) <= -1) {
        var tempcode = ''
        tempcode = '概念-=' + this.selConValue
        this.kgcodeAll = ''
        this.kgcodelist.push(tempcode)
        for (var kg = 0; kg < this.kgcodelist.length; kg++) {
          this.kgcodeAll = this.kgcodeAll + this.kgcodelist[kg] + '\n'
        }
      }
      for (var i = 0; i < this.selNodes.length; i++) {
        for (var j = 0; j < this.network.nodes.length; j++) {
          if (this.selNodes[i] === this.network.nodes[j].id) {
            this.conlist.splice(this.conlist.indexOf(this.network.nodes[j].label), 1)
          }
        }
      }
      for (i = 0; i < this.selNodes.length; i++) {
        var newArr = this.network.nodes.reduce((total, current) => {
          current.id !== this.selNodes[i] && total.push(current)
          return total
        }, [])
        this.network.nodes = newArr
      }
      for (i = 0; i < this.selEdges.length; i++) {
        newArr = this.network.edges.reduce((total, current) => {
          current.id !== this.selEdges[i] && total.push(current)
          return total
        }, [])
        this.network.edges = newArr
      }
      this.selEdges = []
      this.selNodes = []
      var tempstr = ''
      for (var idx in this.conlist) {
        tempstr = tempstr + this.conlist[idx] + ' '
      }

      this.concode = '概念+=' + tempstr
    },
    removeEdge() {
      for (var idx1 in this.selEdges) {
        for (var idx2 in this.network.edges) {
          console.log(this.selEdges[idx1], this.network.edges[idx2].id, idx2)
          if (this.selEdges[idx1] === this.network.edges[idx2].id) { this.network.edges.splice(idx2, 1); console.log(this.network.edges); break }
        }
      }

      // this.network.edges.splice(idx2, 1)
    },
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = ''
      this.networkEvents += `${eventName}, `
    }
  }
}
</script>

<style lang="css">

* {
  font-family: sans-serif;
}
.wrapper {
  padding: 20px 50px;
  text-align: center;
}
.events {
  text-align: left;
  height: 70px;
}
.network {
  position: relative;
  height: 800px;
  border: 1px solid #ccc;
  margin: 5px 0;
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
</style>
