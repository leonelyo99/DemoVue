<template>
  <div>
    <h1 v-if="!pokemon">...Espere por favor</h1>
    <div v-else>
      <h1>¿Quien es este pokemon?</h1>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <PokemonOptions :pokemons="pokemonArr" @slection="checkAnswer($event)" />
      <template v-if="showAnswer">
        <h2>{{ message }}</h2>
        <button @click="newGame">Nuevo Juego</button>
      </template>
    </div>
  </div>
</template>
<script>
import PokemonOptions from "../components/PokemonOptions.vue";
import PokemonPicture from "../components/PokemonPicture.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(id) {
      this.showPokemon = true;
      this.showAnswer = true;
      if (this.pokemon.id === id) {
        this.message = `Correcto era ${this.pokemon.name}`;
      } else {
        this.message = `Ops era ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>
