<template>
  <transition name='slide'>
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" @click="$emit('cancel')" class="icon-close"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" v-if="btnType === 1" @click="$emit('submit')" class="btn">{{sureText}}</a>
          <a href="javascript:;" v-else-if="btnType === 2" @click="$emit('cancel')" class="btn">{{cancelText}}</a>
          <div class="btn-group" v-else>
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 弹框类型： 大框samll，中款middle，小框large，表单from
    modalType: {
      type: String,
      default: "form"
    },
    //弹框标题
    title: {
      type:String,
      default: '提示'
    },
    //按钮类型： 1：确定类型 2：取消按钮 3：取消确定
    btnType: Number,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>

<style lang='scss' scope>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";

.modal {
  @include position(fixed);
  z-index: 10;
  transition: all 0.5s;
  .mask {
    @include position(fixed);
    background-color: #000;
    opacity: 0.5;
  }

  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: -100%;
  }
  .modal-dialog {
    @include position(absolute, 50%, 40%, 660px, auto);
    background-color: #fff;
    transform: translate(-50%, -50%);
    .modal-header {
      height: 60px;
      background-color: #fff;
      line-height: 60px;
      padding: 0 25px;
      font-size: $fontI;
      display: flex;
      justify-content: space-between;
      .icon-close {
        @include bgImg(12px, 12px, "/imgs/icon-close.png");
        margin-top: 25px;
        transition: transform 0.3s;
        &:hover {
          transform: scale(1.5);
        }
      }
    }
    .modal-body {
      padding: 42px 40px 54px;
      font-size: 14px;
      border-top: 1px solid $colorJ;
      border-bottom: 1px solid $colorJ;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #fff;
    }
  }
}
</style>