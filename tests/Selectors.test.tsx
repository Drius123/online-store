import { setUser } from "../src/store/reducers/AuthUserSlice";
import { setBasket } from "../src/store/reducers/BasketSlice";
import { setCategories } from "../src/store/reducers/CategoriesSlice";
import { setUserToken } from "../src/store/reducers/UserTokenSlice";
import { setProducts } from "../src/store/reducers/CustomersSlice";
import { setDiscounts } from "../src/store/reducers/DiscountsSlice";
import { setErrorMain } from "../src/store/reducers/ErrorSlice";
import { setPageNumber } from "../src/store/reducers/PageSlice";
import { setProductsPaging } from "../src/store/reducers/ProductsPagingSlice";
import { setUserRegistration } from "../src/store/reducers/UserRegistrationSlice";

describe('redux selectors', () => {
  it('setUser test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setUser(item);

    expect(result.payload).toBe(item);
  })

  it('setBasket test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setBasket(item);

    expect(result.payload).toBe(item);
  })

  it('setCategories test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setCategories(item);

    expect(result.payload).toBe(item);
  })

  it('setUserToken test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setUserToken(item);

    expect(result.payload).toBe(item);
  })

  it('setProducts test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setProducts(item);

    expect(result.payload).toBe(item);
  })

  it('setDiscounts test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setDiscounts(item);

    expect(result.payload).toBe(item);
  })

  it('setErrorMain test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setErrorMain(item);

    expect(result.payload).toBe(item);
  })

  it('setPageNumber test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setPageNumber(item);

    expect(result.payload).toBe(item);
  })
  
  it('setProductsPaging test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setProductsPaging(item);

    expect(result.payload).toBe(item);
  })

  it('setUserRegistration test', () => {
    const item = [{test: 'some test text'}]
    
    const result = setUserRegistration(item);

    expect(result.payload).toBe(item);
  })
})