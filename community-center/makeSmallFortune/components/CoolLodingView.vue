<template>
    <view class="loaderBackground">
        <view class="loader">
            <view> L </view>
            <view> O </view>
            <view> A </view>
            <view> D </view>
            <view> I </view>
            <view> N </view>
            <view> G </view>
            <view> </view>
            <view> </view>
            <view> </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'CoolLoding'
}
</script>

<style lang="scss" scoped>
.loaderBackground {
    position: relative;
    /* position: fixed;
    bottom: 80rpx;
    left: 0; */
    width: 100%;
    height: 80rpx;
    z-index: 10;
    overflow: hidden;
    background-color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
}
.loader {
    /* top: 60rpx;
    left: 50%; */
    -webkit-transform: translate(-50%,-50%);
    /* -mos-transform: translate(-50%,-50%); */
    transform: translate(-50%,-50%);
    transform: scale(0.6);
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;
    width: 100%;
    max-width: 990px;
    overflow: visible;
    z-index: 99;
}

    .loader, .loader view {
        position: absolute;
        height: 36px;
    }

        .loader view {
            width: 30px;
            margin: 0 20px;
            opacity: 0;
            animation: move 2s linear infinite;
            -o-animation: move 2s linear infinite;
            -moz-animation: move 2s linear infinite;
            -webkit-animation: move 2s linear infinite;
            transform: rotate(180deg);
            -o-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            color: #000000b8;
            font-size: 2em;
        }

            .loader view:nth-child(8):before {
                background: #949494;
            }

            .loader view:nth-child(8):before, .loader view:nth-child(9):before {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 10rpx;
                width: 10px;
                height: 10px;
                border-radius: 100%;
            }

            .loader view:nth-child(9):before {
                background: #515151;
            }

            .loader view:nth-child(10):before {
                bottom: -10px;
                left: 10rpx;
                height: 10px;
                background: #000000;
            }

            .loader view:after, .loader view:nth-child(10):before {
                content: '';
                position: absolute;
                left: 10rpx;
                width: 10px;
                border-radius: 100%;
            }

            .loader view:after {
                bottom: -40px;
                height: 5px;
                background: rgba(255,255,255,.1);
            }

            .loader view:nth-child(2) {
                animation-delay: .2s;
                -o-animation-delay: .2s;
                -moz-animation-delay: .2s;
                -webkit-animation-delay: .2s;
            }

            .loader view:nth-child(3) {
                animation-delay: .4s;
                -o-animation-delay: .4s;
                -webkit-animation-delay: .4s;
            }

            .loader view:nth-child(4) {
                animation-delay: .6s;
                -o-animation-delay: .6s;
                -moz-animation-delay: .6s;
                -webkit-animation-delay: .6s;
            }

            .loader view:nth-child(5) {
                animation-delay: .8s;
                -o-animation-delay: .8s;
                -moz-animation-delay: .8s;
                -webkit-animation-delay: .8s;
            }

            .loader view:nth-child(6) {
                animation-delay: 1s;
                -o-animation-delay: 1s;
                -moz-animation-delay: 1s;
                -webkit-animation-delay: 1s;
            }

            .loader view:nth-child(7) {
                animation-delay: 1.2s;
                -o-animation-delay: 1.2s;
                -moz-animation-delay: 1.2s;
                -webkit-animation-delay: 1.2s;
            }

            .loader view:nth-child(8) {
                animation-delay: 1.4s;
                -o-animation-delay: 1.4s;
                -moz-animation-delay: 1.4s;
                -webkit-animation-delay: 1.4s;
            }

            .loader view:nth-child(9) {
                animation-delay: 1.6s;
                -o-animation-delay: 1.6s;
                -moz-animation-delay: 1.6s;
                -webkit-animation-delay: 1.6s;
            }

            .loader view:nth-child(10) {
                animation-delay: 1.8s;
                -o-animation-delay: 1.8s;
                -moz-animation-delay: 1.8s;
                -webkit-animation-delay: 1.8s;
            }

@keyframes move {
    0% {
        right: 0;
        opacity: 0;
    }

    35% {
        right: 41%;
    }

    35%,65% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 1;
    }

    65% {
        right: 59%;
    }

    to {
        right: 100%;
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
    }
}

@-webkit-keyframes move {
    0%,to {
        opacity: 0;
    }

    0% {
        right: 0;
    }

    35% {
        right: 41%;
    }

    35%,75% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
        opacity: 1;
    }

    75% {
        right: 59%;
    }

    to {
        right: 100%;
        -webkit-transform: rotate(-180deg);
        transform: rotate(-180deg);
        opacity: 0;
    }
}
</style>