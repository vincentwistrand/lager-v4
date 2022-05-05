import { render } from '@testing-library/react-native';
import Stock from '../components/inventory/Stock';

jest.mock("../components/inventory/StockList", () => "StockList");

test('header should exist containing text Lagerförteckning', async () => {
    const { getByText, debug } = render(<Stock/>);

    //debug("Stock component");

    const header = await getByText('Lagerförteckning');

    expect(header).toBeDefined();
});