<template>
  <v-app>
    <v-app-bar elevation="12" app>
      <v-toolbar-title class="headline">
        <span class="font-weight">Meu Brinquedo</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fluid>
      <v-layout text-center wrap>
        <v-flex mt-3 xs10 offset-xs1>
          <v-content>
            <router-view></router-view>
          </v-content>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer elevation="12" padless absolute mt-10>
      <v-card width="100%" flat tile>
        <v-card-text>Projeto conceitual de locadora/reserva de brinquedos.</v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          {{ new Date().getFullYear() }} —
          <strong>Rubens Pinheiro</strong>
        </v-card-text>
      </v-card>
    </v-footer>

    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ mensagem }}
      <v-btn flat color="red" @click.native="snackbar = false">Fechar</v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>

import SendMsg from '@/plugins/sendMsg'
 
export default {
    data() {
      return {
        snackbar: false,
        y: 'button',
        x: null,
        mode: '',
        mensagem: '',
        timeout: 9000,            
        context: 'app context',
        loaded: false
      };
    },
    mounted() {
      var self = this
      SendMsg.$on('Atencao', (value) => {
        self.mensagem = value
        self.snackbar = true           
      })
      setTimeout(function () {
        self.loaded = true;
      }, 500);
    }
}
</script>
