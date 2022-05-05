import { render } from '@testing-library/react-native';
import OrderList from '../components/order/OrderList';

const orders = [
    { name: "Jan", status: 'Packad', status_id: 200 },
    { name: "Johanna", status: 'Ny', status_id: 100 },
    { name: "Siv", status: 'Fakturerad', status_id: 600 },
    { name: "Evert", status: 'Ny', status_id: 100 },
];

const setOrders = () => false;
const route = false;

test('List should contain a title Ordrar and two items', async () => {
    const { getByText, queryByText, debug } = render(<OrderList route={route} test_orders={orders} setOrders={setOrders} />);

    //debug("Stock component");

    const headline = await getByText('Ordrar', { exact: false });
    const Johanna = await getByText('Johanna', { exact: false });
    const Evert = await getByText('Evert', { exact: false });
    const Siv = await queryByText('Siv', { exact: false });
    const Jan = await queryByText('Jan', { exact: false });

    expect(headline).toBeDefined();
    expect(Johanna).toBeDefined();
    expect(Evert).toBeDefined();
    expect(Siv).toBeNull();
    expect(Jan).toBeNull();
});