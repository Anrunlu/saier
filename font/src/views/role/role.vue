<template>
    <div>
       <el-card>
          <el-row>
            <el-col>
              <el-button type="primary">
                  添加角色
              </el-button>
            </el-col>
            </el-row>  
       </el-card> 

       <el-table :data="roleList" border stripe >
         <!-- 索引 -->
         <el-table-column type="expand">
           <template slot-scope="scope"> 
             
             <el-row class="vcenter">
               <el-col :span="4" :class="['bdbottom','bdtop']"><el-tag style="margin:7px">{{scope.row.roleDesc}}</el-tag>
               <i class="el-icon-caret-right"></i>
               </el-col>
                <el-col :span="20"> 
                    <el-row :class="['bdbottom',i===0 ? 'bdtop':'']" v-for="(item,i) in scope.row.child" :key="i">
                      <el-col :span="30">
                        <!-- ❌ -->
                        <el-tag style="margin:7px" type="success" closable @close="removeRight(scope.row,item.id)">{{item.rightDesc}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                    </el-row>
                </el-col>
             </el-row>
             <!-- {{scope.row.roleDesc}} -->
           </template>



         </el-table-column>
         <el-table-column type="index"></el-table-column>
         <el-table-column label="角色名称" prop="roleName"></el-table-column>
         <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
         <el-table-column label="操作" >
           <template slot-scope="scope">
             <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
             <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除</el-button>
             <!-- <el-button type="danger">危险按钮</el-button> -->
             <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRight(scope.row)">分配权限</el-button>
             <!--分配权限对话框 -->
             <el-dialog
              title="分配权限"
              :visible.sync="setRightDialogVisible"
              width="30%" @close="setRightDialogClosed()">
              <!-- 树 -->
              <el-tree :data="rightList" :props="treeProps" show-checkbox node-key="id" default-expand-all
              :default-checked-keys="defKeys"
              ref="treeRef"
              ></el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="setRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotRight()">确 定</el-button>

              </span>
            </el-dialog>
           </template>
         </el-table-column>
       </el-table>
    </div>
</template>
<script>
// import ex from '../../router/index.js'
import { getRole } from "../../../src/api/user.js";
import { getRight } from "../../../src/api/user.js";
import { updateRight} from "../../../src/api/user.js";
import { removeRight} from "../../../src/api/user.js";

import { log } from "util";
import { deflate } from "zlib";
export default {
  data() {
    return {
      // 控制对话框显示与否
      setRightDialogVisible: false,
      defKeys: [],
      // 权限树
      rightList: [],
      // 树形控件属性绑定对象
      treeProps: {
        label: "rightDesc",
        children: "child"
      },
      // 角色信息
      roleList: []
    };
  },
  created() {
    this.getRoleList();
  },
  mounted() {
    getRight().then(res => {
      this.roleList = res.data;
      this.rightList = res.data;
      // console.log(this.roleList);
    });
    getKeys.then(res=>{
      this.defKeys=data.keys
    })
  },
  methods: {
    getRoleList() {},
    async removeRight(role, id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmRes !== "confirm") {
        // console.log("sadas");
        return this.$message.info("取消了删除！");
      }
      // 删除
      else{
        // 删除某个权限
        // 前端删除
        role.child.forEach(item => {
        if(item.id==id){
          var index=role.child.indexOf(item)
          console.log(item)
          role.child.splice(index, 1)
        }
      });
      // 后台删除
      removeRight({"data":[role.id,id]}).then(res=>{
        console.log(res)
      })
      }
       
    
    },
    // 显示权限打勾
    showSetRight(role) {
       
      this.setRightDialogVisible = true;
    },
    // 修改defKeys
    // cil(role, arr) {
    //   // role.forEach(item => {
    //   //   arr.push(item.id)
    //   // });
    //   // console.log(this.defKeys)
     
    // },
    // 关闭树的操作
    setRightDialogClosed() {
      this.defKeys = [];
      this.setRightDialogVisible = false;
    },
    // 显示所有已经被勾选的权限
    allotRight() {
      const keys = [
        // 某个角色的id
        ...this.$refs.treeRef.getCheckedKeys(),
        // 某个角色对应的权限的id
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      // 传回后台将keys数组
      updateRight({"keys":keys}).then(res=>{
        this.defKeys=res.data
        console.log(this.defKeys)

      })
      this.setRightDialogVisible = false;
    },
    // 删除条目
    deleteRole(index) {
      this.roleList.pop({ id: index });
      // console.log(this.roleList);
    }
  }
};
</script>

<style scoped lang="scss">
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>

