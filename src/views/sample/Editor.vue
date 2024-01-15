<template>
   <q-page padding>
      <div class="q-pa-md q-gutter-sm">
         <q-editor
            ref="editor"
            v-model="qeditor"
            :dense="$q.screen.lt.md"
            height="500px"
            :toolbar="[
               [
                  {
                     label: $q.lang.editor.align,
                     icon: $q.iconSet.editor.align,
                     fixedLabel: true,
                     list: 'only-icons',
                     options: ['left', 'center', 'right', 'justify'],
                  },
                  {
                     label: $q.lang.editor.align,
                     icon: $q.iconSet.editor.align,
                     fixedLabel: true,
                     options: ['left', 'center', 'right', 'justify'],
                  },
               ],
               ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
               ['token', 'hr', 'link', 'custom_btn'],
               ['print', 'fullscreen'],
               [
                  {
                     label: $q.lang.editor.formatting,
                     icon: $q.iconSet.editor.formatting,
                     list: 'no-icons',
                     options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                  },
                  {
                     label: $q.lang.editor.fontSize,
                     icon: $q.iconSet.editor.fontSize,
                     fixedLabel: true,
                     fixedIcon: true,
                     list: 'no-icons',
                     options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
                  },
                  {
                     label: $q.lang.editor.defaultFont,
                     icon: $q.iconSet.editor.font,
                     fixedIcon: true,
                     list: 'no-icons',
                     options: [
                        'default_font',
                        'arial',
                        'arial_black',
                        'comic_sans',
                        'courier_new',
                        'impact',
                        'lucida_grande',
                        'times_new_roman',
                        'verdana',
                     ],
                  },
                  'removeFormat',
               ],
               ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

               ['undo', 'redo'],
               ['viewsource'],
               ['insert_img'],
            ]"
            :fonts="{
               arial: 'Arial',
               arial_black: 'Arial Black',
               comic_sans: 'Comic Sans MS',
               courier_new: 'Courier New',
               impact: 'Impact',
               lucida_grande: 'Lucida Grande',
               times_new_roman: 'Times New Roman',
               verdana: 'Verdana',
            }"
            :definitions="definitions"
         ></q-editor>
      </div>
   </q-page>
</template>

<script setup>
import { ref } from 'vue'

const editor = ref(null)
const qeditor = ref('')
const definitions = {
   insert_img: {
      tip: 'Insert Image',
      icon: 'photo',
      handler: insertImg,
   },
}

function insertImg() {
   const input = document.createElement('input')
   input.type = 'file'
   input.accept = '.png, .jpg' // file extensions allowed
   let file
   input.onchange = (_) => {
      const files = Array.from(input.files)
      file = files[0]

      // lets load the file as dataUrl
      const reader = new FileReader()
      let dataUrl = ''
      reader.onloadend = function () {
         dataUrl = reader.result

         //qeditor.value += '<div><img src="' + dataUrl + '" /></div>'
         editor.value.runCmd('insertHtml', '<div><img src="' + dataUrl + '" /></div>')
         console.log(editor.value)
      }
      reader.readAsDataURL(file)
   }
   input.click()
}
</script>

<style scoped></style>
