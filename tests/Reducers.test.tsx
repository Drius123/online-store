import { SearchInputReducer } from "../src/store/reducers/SearchInputSlice";
import { SortTypeReducer } from "../src/store/reducers/SortSlice";
import { isShowReducer } from "../src/store/reducers/ViewSlice";

describe('reducer test', () => {
  it('should return default action', () => {
    const result = SearchInputReducer(undefined, {type: ''});

    expect(result.query).toEqual('')
  })

  it('should return default action', () => {
    const result = SortTypeReducer(undefined, {type: ''});

    expect(result.selectColor).toEqual([])
  })

  it('should return default action', () => {
    const result = isShowReducer(undefined, {type: ''});

    expect(result.isShowMenuBurger).toEqual(false)
  })
})