import { shallowMount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../moks/pokemons.mock";

describe("PokemonPage component", () => {
  let wrapper;
  let mixPokemonArraySpy;

  beforeEach(() => {
    mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, "mixPokemonArray");
    wrapper = shallowMount(PokemonPage);
  });

  test("debe de hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar mixPokemonArray al montar", () => {
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de hacer match con el snapshot cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes de PokemonPicture y PokemonOptions", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: "",
        };
      },
    });
    expect(wrapper.find('pokemon-picture-stub').exists()).toBeTruthy()
    expect(wrapper.find('pokemon-options-stub').exists()).toBeTruthy()

    expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe('1')
    expect(wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy()
  });

  test('pruebas con checkAnswer', async () => {
    const wrapper = shallowMount(PokemonPage, {
        data() {
          return {
            pokemonArr: pokemons,
            pokemon: pokemons[0],
            showPokemon: false,
            showAnswer: false,
            message: "",
          };
        },
      });

      await wrapper.vm.checkAnswer(1);
      expect(wrapper.find('h2').exists()).toBeTruthy()
      expect(wrapper.vm.showPokemon).toBe(true)
  })
});
