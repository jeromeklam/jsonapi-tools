import { getNewModel, normalizedObjectModeler } from '../src/index.js';

const Norm3 = {MAINELEM: "Free_Test", SORTEDELEMS: ["21", "45", "90"], OTHERELEMENTS: [],
                          Free_Test: {
                            "21": {attributes: {name: "test"}, id: "21"},
                            "90": {attributes: {name: "test"}, id: "90"},
                            "45": {attributes: {name: "test"}, id: "45"}
                          }, errors: [], length: 3};

/**
 * getNewModel
 */
test('getNewModel : Verify simple model number id', () => {
  const result = getNewModel('Free_Test', 45);
  expect(result).toEqual({id: 45, "type": "Free_Test"});
});
test('getNewModel : Verify simple model string id', () => {
  const result = getNewModel('Free_Test', '45');
  expect(result).toEqual({id: 45, "type": "Free_Test"});
});

/**
 * buildModel
 */
test('buildModel : Verify model with list NormalizedObject without id', () => {
  const result = normalizedObjectModeler({MAINELEM: "Free_Test", SORTEDELEMS: ["21", "45", "90"], OTHERELEMENTS: [],
                            Free_Test: {
                              "21": {attributes: {name: "test"}, id: "21"},
                              "90": {attributes: {name: "test"}, id: "90"},
                              "45": {attributes: {name: "test"}, id: "45"},
                            }, errors: [], length: 3}, "Free_Test");
  expect(result).toEqual([{id: "21", "name": "test", "type": "Free_Test"},
                          {id: "45", "name": "test", "type": "Free_Test"},
                          {id: "90", "name": "test", "type": "Free_Test"}
                        ]);
});
test('buildModel : Verify model with list NormalizedObject with id', () => {
  const result = normalizedObjectModeler({MAINELEM: "Free_Test", SORTEDELEMS: ["21", "45", "90"], OTHERELEMENTS: [],
                            Free_Test: {
                              "21": {attributes: {name: "test"}, id: "21"},
                              "90": {attributes: {name: "test"}, id: "90"},
                              "45": {attributes: {name: "test"}, id: "45"}
                            }, errors: [], length: 3}, "Free_Test", "45");
  expect(result).toEqual({id: "45", "name": "test", "type": "Free_Test"});
});
test('buildModel : Verify model with NormalizedObject without id', () => {
  const result = normalizedObjectModeler({MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                            Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1}, "Free_Test");
  expect(result).toEqual([{id: "45", "name": "test", "type": "Free_Test"}]);
});
test('buildModel : Verify model with NormalizedObject with id', () => {
  const result = normalizedObjectModeler({MAINELEM: "Free_Test", SORTEDELEMS: ["45"],
                            Free_Test: { "45": {attributes: {name: "test"}, id: "45"}}, errors: [], length: 1},
                            "Free_Test", "45");
  expect(result).toEqual({id: "45", "name": "test", "type": "Free_Test"});
});
