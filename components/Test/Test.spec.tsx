import { render } from '@testing-library/react'
import Test from '.'

test('sum', () => {
    const { getByText } = render(<Test />)

    expect(getByText('Sabrina')).toBeTruthy()
})