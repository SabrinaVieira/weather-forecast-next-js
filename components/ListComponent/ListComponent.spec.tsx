import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import ListComponent from '../TextComponent';

describe('ListComponent', () => {
    it('should render list items', () => {
       const { getByText } = render(<ListComponent />)

    expect(getByText('Sabrina')).toBeInTheDocument()
    expect(getByText('Gabriel')).toBeInTheDocument()
    expect(getByText('Natan')).toBeInTheDocument()

    });

    it('should be able to add new item to the list', () => {
        const { getByText, debug } = render(<ListComponent />)
        const addButton = getByText('Adicionar', { selector: 'button' });

        userEvent.click(screen.getByText('Check'))
        expect(getByText('Novo')).toBeInTheDocument()

    // expect(screen.getByLabelText('Check')).toBeChecked()

        debug()

        userEvent.click(addButton)
        expect(getByText('Novo')).toBeInTheDocument()

        debug()

    })
})


// test('sum', () => {
//     const { getByText, getByTestId } = render(<ListComponent />)

//     // expect(getByText('Sabrina')).toBeTruthy()
//     // expect(getByText('Sabrina')).toBeInTheDocument()
//     expect(getByText('Sabrina')).toHaveAttribute('class', 'test')
//     expect(getByTestId('test_id')).toHaveAttribute('id', 'test_id')
    
// })
