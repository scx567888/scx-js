<template>

    <div v-drag="dragEvent" :class="{'show-notice':showNotice}" class="scx-notice-button-wrapper">
        <div class="scx-notice-button">
            <scx-icon :icon="showNotice?'outlined-close':'outlined-bell'"/>
            <div v-if="$slots['tip']" class="tip">
                <slot name="tip"></slot>
            </div>
        </div>
    </div>

    <div :class="{'show-notice':showNotice}" class="scx-notice">
        <slot name="default"></slot>
    </div>

</template>

<script>
import {ref, watch} from "vue";

export default {
    name: "scx-notice",
    setup() {

        const showNotice = ref(false);

        function closeSidebar(evt) {
            const parentA = evt.target.closest(".scx-notice");
            const parentB = evt.target.closest(".scx-notice-button");
            if (!parentA && !parentB) {
                showNotice.value = false;
                window.removeEventListener("click", closeSidebar);
            }
        }

        const dragEvent = {
            bounds: (e) => {
                if (showNotice.value) {
                    e.right = e.right - 260;
                }
                return e;
            },
            onClick: (el) => {
                showNotice.value = !showNotice.value;
            },
            onDrag: (el) => {
                el.classList.add("dragging");
            },
            onDragEnd: (el) => {
                el.classList.add("drag-moving");
                let nowMatrix = new DOMMatrix(window.getComputedStyle(el).transform);
                //清除我们不需要的坐标
                nowMatrix = nowMatrix.translate(-nowMatrix.e, 0);
                el.style.transform = nowMatrix.toString();
                el.addEventListener("transitionend", (e) => {
                    if (e.target === el) {
                        el.classList.remove("drag-moving");
                        el.classList.remove("dragging");
                    }
                });
            }
        };

        watch(showNotice, (value) => {
            value && window.addEventListener("click", closeSidebar);
        });

        return {
            dragEvent,
            showNotice,
        };
    }
};
</script>
<style>
.scx-notice-button-wrapper {
    z-index: 10;
    height: 48px;
    width: 48px;
    position: fixed;
    right: 0;
    top: 35%;
    transition: right 0.25s cubic-bezier(0.7, 0.3, 0.1, 1)
}

/*右侧操作按钮*/
.scx-notice-button-wrapper.show-notice {
    right: 260px;
}

/*右侧操作按钮*/
.scx-notice-button {
    height: 100%;
    width: 100%;
    border-radius: 2px 0 0 2px;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    transition: background 0.3s ease-in, transform 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: var(--scx-theme-bg, #3a8ee6);
    display: flex;
    user-select: none;
    justify-content: center;
    z-index: 300;
}

.dragging {
    transition: unset;
}

.dragging .scx-notice-button {
    transform: scale(0.9);
    border-radius: 2px;
    cursor: move;
}

:not(.show-notice) .scx-notice-button:hover svg {
    animation: ringing 2500ms ease infinite;
}

.show-notice .scx-notice-button:hover svg {
    animation: rotating 1700ms linear infinite;
}

.scx-notice-button:hover {
    background: var(--scx-theme, #ffaaff);
}

.scx-notice-button svg {
    pointer-events: none;
    fill: whitesmoke;
    margin-top: 25%;
    font-size: 24px;
}

.scx-notice {
    position: fixed;
    width: 260px;
    height: 100%;
    top: 0;
    right: 0;
    transform: translateX(260px);
    background: var(--scx-glass-bg);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    backdrop-filter: var(--scx-glass-bg-filter);
    display: flex;
    padding: 16px;
    justify-content: center;
    align-items: center;
    word-wrap: break-word;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 5;
}

.scx-notice.show-notice {
    transform: translateX(0);
    box-shadow: var(--scx-box-shadow-left);
}

.drag-moving {
    transition: transform 600ms ease-out;
}

/* 旋转动画 */
@keyframes rotating {
    0% {
        transform: rotate(0)
    }
    100% {
        transform: rotate(360deg)
    }
}

/* 铃铛动画 */
@keyframes ringing {
    0%, 50%, 100% {
        transform: rotate(0deg);
    }
    5%, 10%, 15%, 20%, 30%, 35%, 40% {
        transform: rotate(6deg);
    }
    45% {
        transform: rotate(4deg);
    }
    7.5%, 12.5%, 17.5%, 22.5%, 27.5%, 32.5%, 37.5%, 42.5% {
        transform: rotate(-6deg);
    }
    47.5% {
        transform: rotate(-2deg);
    }
}

.tip {
    position: absolute;
    top: -10px;
    right: 4px;
    font-size: 10px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ff5454;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 2px;
    border: 2px solid #ff8888;
}
</style>
