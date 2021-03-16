<template>
  <!-- 广告编辑 -->
  <div class="advertDialog">
    <!-- Form表单 -->
    <el-dialog width="400px" title="修改" :visible.sync="dialogEdit">
      <el-form
        :model="editInfo"
        :rules="rules"
        ref="editInfo"
        :inline="true"
        label-position="right"
      >
        <el-form-item label="广告标题" prop="title" label-width="110px">
          <el-input v-model="editInfo.title" clearable></el-input>
        </el-form-item>
        <!-- 原图片 -->
        <el-form-item label="原图片地址" prop="points" label-width="110px">
          <img :src="imgUrl" min-width="70px" height="70px" />
        </el-form-item>
        <!-- 上传新图片 -->
        <el-upload
          ref="uploads"
          :action="uploadUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form-item label="来源" prop="come" label-width="110px">
          <el-input
            v-model="editInfo.come"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="广告内容" prop="content" label-width="110px">
          <el-input
            type="textarea"
            v-model="editInfo.content"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="editSure()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      version: "",
      id: "",
      img: "",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogEdit: false,
      editInfo: {
        title: "",
        points: "",
        content: "",
        imgUrl: "",
        sortNo: "",
        come:'',
      },
      uploadUrl: "http://localhost:8080/advert/imgAdd", //拼接url
      imgUrl: "", //原图片地址
      // 校验
      rules: {
        title: [
          {
            required: true,
            pattern: /^[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,20}$/,
            message: "标题最长20字符",
            trigger: "blur",
          },
        ],
        come: [
          {
            required: true,
            pattern: /^[a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,20}$/,
            message: "来源最长20字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            pattern: /^[a-zA-Z]{1,1000}|[\u4e00-\u9fa5]{1,1000}$/,
            message: "内容最长1000字符",
            trigger: "blur",
          },
        ],
        imgUrl: [
          {
            required: true,
            pattern: /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
            message: "请输入图片地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 编辑弹框
    openDialog(flag, val) {
      this.dialogEdit = flag;

      this.$nextTick(() => {
        this.$refs.editInfo.resetFields();
        console.log(val);
        this.editInfo.title = val.title;
        this.editInfo.way = val.way;
        this.editInfo.content = val.content;
        this.editInfo.imgUrl = val.imgUrl;
        this.editInfo.sortNo = val.sortNo;
        this.version = val.version;
        this.id = val.advert_id;
        this.editInfo.come=val.come;
        this.imgUrl = val.imgUrl;
      });
    },
    // 取消
    cancelDialog() {
      this.dialogEdit = false;
    },
    // 确定
    editSure() {
      this.dialogEdit = false;
      this.$refs["editInfo"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/advert/advertUpdate"),
            method: "post",
            data: this.$http.adornData({
              title: this.editInfo.title,
              content: this.editInfo.content,
              imgUrl: this.img,
              come:this.editInfo.come,
              id: this.id,
            }),
          })
            .then(({ data }) => {
              if (0 == data.code) {
                this.$message({
                  showClose: true,
                  message: "操作成功",
                  type: "success",
                });
                this.$emit("search");
                this.cancelDialog();
              } else {
                this.$message({
                  showClose: true,
                  message: "操作失败",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      var that = this;
      //判断是否是图片
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      //返回file.name这个string对象的一个字串
      const JpjPic = testmsg === "jpg";
      const PngPic = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!JpjPic && !PngPic) {
        this.$message({
          message: "上传文件只能是jpg、png格式",
        });
        setTimeout(() => this.$refs.uploads.clearFiles(), 100);
        //清空
        this.dialogVisible = false;
      } else if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过10MB",
          type: "error",
        });
      } else {
        let fd = new FormData();
        fd.append("file", file); //传文件
        this.$http({
          url: this.$http.adornUrl("/advert/imgAdd"),
          method: "post",
          data: fd,
        })
          .then(({ data }) => {
            if (0 == data.code) {
              this.imgUrl =
                "http://localhost:8081/advert/" + data.fileName.filename;
              this.img = data.fileName.filename;
              this.$message({
                showClose: true,
                message: "操作成功",
                type: "success",
              });
            } else {
              this.$message({
                showClose: true,
                message: "操作失败",
                type: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
</style>
