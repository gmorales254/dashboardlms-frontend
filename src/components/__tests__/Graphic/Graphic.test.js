import {render, screen, cleanup} from '@testing-library/react';
import Graphic from "../../Graphic/Graphic";
import renderer from 'react-test-renderer';
import "@testing-library/jest-dom";

afterEach(()=>{
    cleanup();
})

test("Should render graphic component", ()=>{
    render(<Graphic></Graphic>);
    const graphicElem = screen.getByTestId("graphic");
    expect(graphicElem).toBeInTheDocument();
})