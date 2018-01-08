<template>
  <Form :model="formModel" :label-width="80">
    <Form-item label="姓名">
      <Input v-model="formModel.name" placeholder="请输入姓名"></Input>
    </Form-item>
    <Form-item label="年龄">
      <Input v-model="formModel.age" placeholder="请输入年龄"></Input>
    </Form-item>
    <Form-item label="地址">
      <Input v-model="formModel.address" placeholder="请输入地址"></Input>
    </Form-item>
  </Form>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      },
      modalInstance: {
        type: Object,
        required: true
      },
      ok: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        formModel: {
          ...this.data
        }
      }
    },
    watch: {
      ok() {
        if (Math.random() * 10 << 1 < 8) {
          this.modalInstance.buttonLoading = false;
        } else {
          setTimeout(() => {
            this.$emit('ok', this.formModel);
            this.$Modal.remove()
          }, 1000)
        }
      }
    }
  }
</script>