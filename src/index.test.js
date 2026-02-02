import huh from "./index.js";

test("andy returns huh your name is andy", ()=>{
    expect(huh("andy")).toMatch(/huh your name is andy/);
})