<template>
  <div class="wrapper">
    <h2>知识图谱编辑</h2>
    <network
      ref="network"
      class="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
      
      @click="networkEvent('click')"
      @double-click="networkEvent('doubleClick')"
      @oncontext="networkEvent('oncontext')"
      @hold="networkEvent('hold')"
      @release="networkEvent('release')"
      @select="networkEvent('select')"
      @select-node="networkEvent('selectNode')"
      @select-edge="networkEvent('selEdge')"
      @deselect-node="networkEvent('deselectNode')"
      @deselect-edge="networkEvent('deselectEdge')"
      @drag-start="networkEvent('dragStart')"
      @dragging="networkEvent('dragging')"
      @drag-end="networkEvent('dragEnd')"
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
      @nodes-add="addnode"
      @nodes-update="networkEvent('nodes-update')"
      @nodes-remove="networkEvent('nodes-remove')"
      @edges-mounted="networkEvent('edges-mounted')"
      @edges-add="networkEvent('edges-add')"
      @edges-update="networkEvent('edges-update')"
      @edges-remove="networkEvent('edges-remove')"
    />
    <!-- <button @click="addNode">增加知识点</button>
    <button @click="addEdge">建立关联</button>
    <button @click="resetNetwork">Reset Network</button>
    <button @click="removeNode">删除知识点</button>
    <button @click="removeEdge">删除关联</button> -->
    <!-- <div class="events">
      <p>
        Network events: <br>
        {{ networkEvents }}
      </p>
    </div> -->

    <hr>
    <div>
      <el-input v-model="kgcode" type="textarea" rows="8" placeholder="test" />
    </div>

    
  </div>
</template>

<script>
import { Network } from 'vue2vis'
// import { Timeline, Graph2d, Network } from 'vue2vis'
import 'vue2vis/dist/vue2vis.css'
export default {
  components: {
    // Timeline,
    // Graph2d,
    Network
  },
  data: () => ({
    
    kgcode: '',
    nodeData: '',
    networkEvents: '',
    network: {
      
      nodes: [
        { id: 1, label: '节点 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ],
      edges: [
        { id: 1, from: 1, to: 3 },
        { id: 2, from: 1, to: 2 },
        { id: 3, from: 2, to: 4 },
        { id: 4, from: 2, to: 5 },
        { id: 5, from: 3, to: 3 }
      ],
      options: {

        locale: 'cn', // 工具栏显示中文
	            locales: {
	              cn: {// 工具栏中文翻译
	                edit: '编辑',
	                del: '删除当前知识点或关联',
	                back: '返回',
	                addNode: '添加知识点',
	                addEdge: '添加关联',
	                editNode: '编辑知识点',
	                editEdge: '编辑关联',
	                addDescription: '点击空白处可添加知识点',
	                edgeDescription: '点击某个知识点拖拽连线可连接另一个知识点',
	                editEdgeDescription: '可拖拽连线改变知识点关联',
	                createEdgeError: 'Cannot link edges to a cluster.',
	                deleteClusterError: 'Clusters cannot be deleted.',
	                editClusterError: 'Clusters cannot be edited.'
	              }
	          },

        manipulation: {
          enabled: true,
          initiallyActive: false,
          addNode: function(nodeData,callback) {
      nodeData.label = 'hello world';
      // console.log(nodeData)
      callback(nodeData);
    },
          addEdge: true,
          editNode: true,
          editEdge: true,
          deleteNode: true,
          deleteEdge: true,
          controlNodeStyle: {
            // all node options are valid.
          }
        },

        nodes: {
          // fixed: true,

          shape: 'box'
        }
      }
    }
  }),
  methods: {
    addnode(data, callback) {
     console.log(this.nodeData)
    },
    networkEvent(eventName) {
      if (this.networkEvents.length > 500) this.networkEvents = ''
      this.networkEvents += `${eventName}, `
    },
    timelineEvent(eventName) {
      if (this.timelineEvents.length > 500) this.timelineEvents = ''
      this.timelineEvents += `${eventName}, `
    },
    timelineWithoutGroupsEvent(eventName) {
      if (this.timelineWithoutGroupsEvents.length > 500) { this.timelineWithoutGroupsEvents = '' }
      this.timelineWithoutGroupsEvents += `${eventName}, `
    },
    graph2dEvent(eventName) {
      if (this.graph2dEvents.length > 500) this.graph2dEvents = ''
      this.graph2dEvents += `${eventName}, `
    },
    // addNode() {
      // const id = new Date().getTime()
      // this.network.nodes.push({ id, label: 'New node' })

    // },
    addEdge() {
      const n1 = Math.floor(Math.random() * this.network.nodes.length)
      const n2 = Math.floor(Math.random() * this.network.nodes.length)
      this.network.edges.push({
        id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
        from: this.network.nodes[n1].id,
        to: this.network.nodes[n2].id
      })
    },
    resetNetwork() {
      this.network = {
        nodes: [
          { id: 1, label: 'Node 1' },
          { id: 2, label: 'Node 2' },
          { id: 3, label: 'Node 3' },
          { id: 4, label: 'Node 4' },
          { id: 5, label: 'Node 5' }
        ],
        edges: [
          { id: 1, from: 1, to: 3 },
          { id: 2, from: 1, to: 2 },
          { id: 3, from: 2, to: 4 },
          { id: 4, from: 2, to: 5 },
          { id: 5, from: 3, to: 3 }
        ],
        options: {}
      }
    },
    removeNode() {
      this.network.nodes.splice(0, 1)
    },
    removeEdge() {
      this.network.edges.splice(0, 1)
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
  height: 500px;
  border: 1px solid #ccc;
  margin: 5px 0;
}
</style>
