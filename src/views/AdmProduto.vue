    <template>
  <v-container fluid>
    <!-- Adcionar -->
    <v-flex class="text-xs-center py-3">
      <v-btn @click="showDialog(true)" color="primary">
        <v-icon>add</v-icon>Adicionar
      </v-btn>
    </v-flex>

    <!-- Lista -->
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <div class="headline">Produtos</div>
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Pesquisar resultado da grid"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="produtos"
          :search="search"
          :loading="loading"
          class="elevation-1"
          no-data-text="Nenhum produto foi localizado"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
            }"
        >
          <v-progress-linear slot="progress" color="primary" indeterminate></v-progress-linear>
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.IDPRODUTO }}</td>
            <td class="text-xs-center">{{ props.item.PRODUTO }}</td>
            <td class="text-xs-center">{{ props.item.INFOTECNICA }}</td>
            <td class="text-xs-center">
              <span>{{ props.item.VLRRESERVA | currency}}</span>
            </td>
            <td class="text-xs-center">{{ props.item.RATING }}</td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Nenhuma ocorrência localizada com o valor : "{{ search }}"</v-alert>
        </v-data-table>
      </v-card>
    </v-flex>

    <!-- Dialogo -->
    <v-dialog v-model="dialogShow" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="IDPRODUTO">Atualizar Produto</span>
          <span class="headline" v-else>Adicionar Produto</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12>
                <v-text-field label="Produto" v-model="PRODUTO" required />
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field label="Informação Técnica" v-model="INFOTECNICA" required />
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field label="URL Imagem" v-model="URLIMG1" required />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Vlr. Reserva" v-model="VLRRESERVA" required hide-details single-line type="number" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Rating" v-model="RATING" required  hide-details single-line type="number" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-switch v-model="DISPONIVEL" label="Disponível"></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="showDialog(false)">Fechar</v-btn>
          <v-btn color="blue darken-1" @click="salvar()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SendMsg from "@/plugins/sendMsg";
export default {
  data() {
    return {
      loading: false,
      search: "",
      headers: [
        { text: "Cód. Produto", align: "left", value: "IDPRODUTO" },
        { text: "Produto", align: "left", value: "PRODUTO" },
        { text: "Inf. Técnica", align: "left", value: "INFOTECNICA" },
        { text: "Vlr. Reserva", align: "left", value: "VLRRESERVA" }
      ],
      produtos: [],

      dialogShow: false,

      IDPRODUTO: null,
      PRODUTO: null,
      INFOTECNICA: null,
      URLIMG1: null,
      VLRRESERVA: null,
      RATING: null,
      DISPONIVEL: false
    };
  },
  methods: {
    showDialog(show, produto) {
      this.dialogShow = show;

      this.IDPRODUTO = (produto || {}).IDPRODUTO;
      this.PRODUTO = (produto || {}).PRODUTO;
      this.INFOTECNICA = (produto || {}).INFOTECNICA;
      this.URLIMG1 = (produto || {}).URLIMG1;
      this.VLRRESERVA = (produto || {}).VLRRESERVA;
      this.RATING = (produto || {}).RATING;
      this.DISPONIVEL = (produto || {}).DISPONIVEL;
    },
    existeRegistro() {
      if (this.produtos === undefined) {
        return false;
      } else {
        return true;
      }
    },
    salvar() {
      var cadastro = {
        PRODUTO: this.PRODUTO,
        INFOTECNICA: this.INFOTECNICA,
        URLIMG1: this.URLIMG1,
        VLRRESERVA: this.VLRRESERVA,
        RATING: this.RATING,
        DISPONIVEL: this.DISPONIVEL
      };

      this.axios({
        method: "post",
        url: "produto",
        data: cadastro,
        config: {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      })
        .then(res => {
          this.dialogShow = false;
          this.refreshGrid();
          SendMsg.$emit("Atencao");
          console.log(res.data);
        })
        .catch(e => {
          SendMsg.$emit("Atencao", e);
          console.log(e);
        });
    },
    refreshGrid() {
      this.axios
        .get("produto/?descricao=%")
        .then(res => {
          this.produtos = res.data;
        })
        .catch(e => {
          SendMsg.$emit("Atencao", e);
        });
    },
    DescProdDisponvivel: disponivel => {
      return disponivel === true ? "Sim" : "Não";
    }
  },
  mounted() {
    this.refreshGrid();
  }
};
</script>