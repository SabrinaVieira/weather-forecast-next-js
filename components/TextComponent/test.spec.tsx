import { render } from '@testing-library/react'
import Test from '../ListComponent'

test('sum', () => {
    const { getByText, getByTestId } = render(<Test />)

    // expect(getByText('Sabrina')).toBeTruthy()
    expect(getByText('Sabrina')).toBeInTheDocument()
    // expect(getByText('Sabrina')).toHaveAttribute('class', 'test')
    // expect(getByTestId('test_id')).toHaveAttribute('id', 'test_id')
    
})