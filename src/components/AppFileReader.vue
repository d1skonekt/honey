<template>
  <div class="file-reader" v-if="!getSheetData">
    <label class="file">
      <input
        type="file"
        ref="file"
        name="file"
        @change="fileOnChange"
        accept=".xls,.xlsx"
        aria-label="File browser example"
      />
      <span class="file-custom"></span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { read, utils } from 'xlsx'
import { normalizeSheetJSON } from '@/helpers'

export default {
  name: 'AppFileReader',

  data() {
    return {
      fileReader: new FileReader(),
    }
  },

  created() {
    this.fileReader.addEventListener('loadend', this.handleFileLoad)
  },

  computed: {
    ...mapGetters({
      getSheetData: 'getSheetData',
    }),
  },

  methods: {
    ...mapActions({
      setSheetData: 'setSheetData',
      changeErrorMsg: 'changeErrorMsg',
    }),

    fileOnChange(event) {
      this.fileReader.readAsBinaryString(event.target.files[0])
    },
    handleFileLoad(event) {
      try {
        const fileData = event.target.result
        const workBook = read(fileData, { type: 'binary' })
        const firstSheetName = Object.keys(workBook.Sheets)[0]
        const mainSheet = utils.sheet_to_json(workBook.Sheets[firstSheetName])

        this.setSheetData(normalizeSheetJSON(mainSheet))
      } catch (error) {
        this.changeErrorMsg({
          title: 'Sheet load error',
          description: 'Check instruction and load correct sheet with correct fields',
        })
        this.$refs.file.value = ''
      }
    },
  },
}
</script>

<style>
.file {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 2.5rem;
}
.file input {
  min-width: 14rem;
  margin: 0;
  filter: alpha(opacity=0);
  opacity: 0;
}
.file-custom {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #fff;
  border: 0.075rem solid #ddd;
  border-radius: 0.25rem;
  box-shadow: inset 0 0.2rem 0.4rem rgba(0, 0, 0, 0.05);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.file-custom:after {
  content: 'Choose file...';
}
.file-custom:before {
  position: absolute;
  top: -0.075rem;
  right: -0.075rem;
  bottom: -0.075rem;
  z-index: 6;
  display: block;
  content: 'Browse';
  padding: 0.5rem 1rem;
  line-height: 1.5;
  color: #555;
  background-color: #eee;
  border: 0.075rem solid #ddd;
  border-radius: 0 0.25rem 0.25rem 0;
}
</style>
