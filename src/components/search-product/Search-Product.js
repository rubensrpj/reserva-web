import SendMsg from "@/plugins/sendMsg";

export default {
  data() {
    return {
      produtos: [],
      chavepesquisa: ""
    };
  },
  methods: {
    OnKeyPressPesquisar: function() {
      if (this.chavepesquisa === ""){
        this.Pesquisar("")
      }
    },
    Pesquisar: function() {
        this.refreshGrid('%'+this.chavepesquisa+'%')
    },   
    refreshGrid: function (chave) {
      this.axios
        .get("produto/?descricao="+chave)
        .then(res => {
          this.produtos = res.data;
        })
        .catch(e => {
          SendMsg.$emit("Atencao", e);
        });
    }
  },
  mounted() {
    this.refreshGrid('%');
  }  
};


