<template>
    <section>
        <bacab-aside v-if="formStatus"
                     :name="bacabAsideText"
                     close-prop="formStatus"
                     save-button
                     :save-button-function="saveForm">
            <template slot="content">
                <brands-inventory-form ref="formComponent1"/>
            </template>
        </bacab-aside>
        <div class="header-buttons">
            <div class="header-buttons__main-buttons">
                <el-button
                    size="small"
                    round
                    @click="newBrand()"
                    icon="glyphicon glyphicon-floppy-open">
                    <b>Nueva Marca</b>
                </el-button>
            </div>
        </div>
        <div class="main-panel">
            <bacab-tables title="Listado de Marcas"
                          :update-value="updateBrands"
                          :remote-url="routes.cmms.brands"
                          :table-config="tableConfig">
                <template slot="actionSlot"  slot-scope="obj">
                    <div style="rigth: 0">
                        <el-button
                                size="small"
                                round
                                type="info"
                                @click="editRow(obj.row)"
                                icon="fas fa-edit">
                            <b>Editar</b>
                        </el-button>
                        <el-button
                                size="small"
                                round
                                type="danger"
                                @click="deleteRow(obj.row)"
                                icon="fas fa-trash-alt">
                            <b>Borrar</b>
                        </el-button>
                    </div>
                </template>
            </bacab-tables>
        </div>
    </section>
</template>
<script>
 import brandsInventoryForm from './brandsInventoryForm';
 import BacabAside from '../../../components/bacabAside';
 import BacabTables from '../../../components/bacabTables'
 import general from '../../../global/mixins/general';
 import tableConfig from './tableConfig'
 import dataForm from './form'
 import {BacabAjax} from '../../../global/misc/bacabAjax';
 import cmmsMixin from '../../../global/mixins/cmms'
 export default {
     name: "index",
     mixins: [ general, cmmsMixin],
     components: {BacabTables, BacabAside, brandsInventoryForm},
     data() {
         return {
             formStatus: false,
             bacabAsideText: 'Formulario del Modelo',
             tableConfig,
             dataForm: Object.assign({},dataForm)
         }
     },
     mounted() {
         console.log(this.dataForm)
     },
     methods: {
         togleMainForm() {
             this.formStatus = !this.formStatus
         },
         deleteRow(row){
             let ajax = new BacabAjax(`${this.routes.cmms.brands}/${row.id}`, this.dataForm, this);
             ajax.delete('cmms/UPDATE_BRANDS')
         },
         newBrand(){
             this.dataForm = Object.assign({},dataForm);
             this.togleMainForm()
         },
         editRow(row){
             this.dataForm = Object.assign({},row);
             this.togleMainForm();
         },
         saveForm() {
             return new Promise((resolve,reject) => {
                 if(this.$refs.formComponent1.submitForm() === true){
                     if(this.dataForm .id !== 0){
                         let ajax = new BacabAjax(this.routes.cmms.brands, this.dataForm,this);
                         ajax.store('cmms/UPDATE_BRANDS');
                         resolve()
                     } else {
                         let ajax = new BacabAjax(`${this.routes.cmms.brands}/${this.dataForm.id}`, this.dataForm, this);
                         ajax.update('cmms/UPDATE_BRANDS');
                         resolve()
                     }
                 } else {
                     reject('noMessage');
                 }
             })
         }
     }
 }
</script>