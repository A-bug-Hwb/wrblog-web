import {defineStore} from 'pinia';

const loadingDialogStore = defineStore(
  'loadingDialog',
  {
    state: () => ({
      isShow: false,
      text: "Refreshing Application...",
      color: "primary",
    }),
    actions: {
      ShowLoadingDialog(text?: string, color?: string) {
        this.isShow = true
        if (text) {
          this.text = text
        }
        if (color) {
          this.color = color
        }
      },
      HideLoadingDialog() {
        this.isShow = false
      }
    }
  }
)

export default loadingDialogStore
