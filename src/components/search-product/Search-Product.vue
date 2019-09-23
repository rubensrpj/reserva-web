<template>
  <div>
    <v-card flat color="transparent">
      <v-card-text>
        <v-form>
          <v-text-field
            outlined
            solo
            flat
            label="Pesquise o brinquedo desejado"
            prepend-inner-icon="search"
            v-model="chavepesquisa"
            v-on:keyup="OnKeyPressPesquisar"
          />
          <v-btn x-large color="success" dark
            @click="Pesquisar()" >Pesquisar</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <div class="productresult">
      <h1 class="subheading grey-text">Resultado da Pesquisa</h1>
      <v-container grid-list-xl>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="produto in produtos" :key="produto.id">
            <v-card flat class="text-xs-center ma-3">
              <v-responsive class="pt-4">
                <v-img :src="produto.URLIMG1"></v-img>
              </v-responsive>
              <v-card-title>{{produto.PRODUTO}}</v-card-title>
              <v-card-text>
                <v-row align="center">
                  <v-rating :value=produto.RATING color="amber" half-increments dense size="14" readonly></v-rating>
                  <div class="grey--text ml-4">{{produto.RATING}}</div>
                </v-row>
                <div class="my-4 subtitle-1 black--text">Informação Técnica</div>
                <div>{{produto.INFOTECNICA}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>

              <v-card-actions>
                <v-btn color="deep-purple accent-4" text>Reservar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script src="./Search-Product.js"></script>
<!--style src="./Search-Product.css"></!--style>-->

