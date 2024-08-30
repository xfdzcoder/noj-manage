<template>
  <router-view />
</template>


<script setup>

defineOptions({
  name: 'App'
})

</script>


<style scoped>
:deep(.el-table) {
  --el-table-bg-color: var(--noj-main-bg-color);
  --el-table-border-color: #313438;
  --el-table-border: 1px solid var(--el-table-border-color);
  --el-table-text-color: #ffffff;
  --el-table-header-bg-color: var(--noj-main-bg-color);
  --el-table-header-text-color: #ffffff;
  --el-table-row-hover-bg-color: #26282e;
  /* ??? */
  --el-table-fixed-box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
  --el-table-tr-bg-color: var(--noj-main-bg-color);
}
:deep(.el-button.is-text:not(.is-disabled):hover) {
  background-color: #4b4c4f;
}

:deep(.el-dialog) {
  border-radius: 15px;
  --el-dialog-bg-color: var(--noj-dialog-bg-color);
}

:deep(.el-input),
:deep(.el-textarea) {
  --el-input-bg-color: var(--noj-dialog-bg-color);
  --el-input-focus-border-color: var(--noj-primary-color);
  --el-input-focus-border: 1px solid var(--noj-primary-color);
  --el-input-border-color: var(--noj-border-color);
  --el-input-text-color: #ffffff;
}

:deep(.el-input-number__increase),
:deep(.el-input-number__decrease) {
  background-color: var(--noj-dialog-bg-color);
}
:deep(.el-input-number__increase) {
  border-left: var(--noj-border);
}
:deep(.el-input-number__decrease) {
  border-right: var(--noj-border);
}
:deep(.el-input-number__increase .el-icon),
:deep(.el-input-number__decrease .el-icon) {
  --color: #9a9da1;
  font-size: 1rem;
}

:deep(.el-form-item__label) {
  color: #FFFFFF;
}

:deep(.el-select) {
  --el-select-border-color-hover: var(--noj-border-color);
  --el-select-input-color: var(--noj-border-color);
  --el-fill-color-blank: var(--noj-dialog-bg-color);
  --el-input-border-color: var(--noj-border-color);
  --el-border-color: var(--noj-border-color);
}
:global(.el-select-dropdown__item.is-hovering) {
  --el-fill-color-light: var(--noj-primary-color);
}
:global(.el-select-dropdown__item) {
  --el-text-color-regular: #ffffff;
}
:global(.el-select__popper.el-popper) {
  --el-bg-color-overlay: var(--noj-dialog-bg-color);
}
:global(.el-select__placeholder) {
  --el-input-text-color: #ffffff;
}

:global(.el-popover.el-popper) {
  --el-popover-bg-color: var(--noj-dialog-bg-color);
  --el-popover-border-color: var(--noj-dialog-bg-color);
  --el-bg-color-overlay: var(--noj-dialog-bg-color);
  --el-border-color-light: none;
}
/*:global(.el-popconfirm__main) {
  color: red;
}*/
:global(.el-popconfirm__action .el-button:first-child) {
  border: none;
  color: var(--noj-primary-color);
}
:global(.el-popconfirm__action .el-button:last-child) {
  background-color: red;
  border: none;
}

</style>
