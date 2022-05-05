import { render } from '@testing-library/react-native';
import PickList from '../components/order/PickList';

const deliveries = [
    { product_name: "Sked", delivery_date: "2022-05-01", amount: 7 },
    { product_name: "Tallrik", delivery_date: "2022-05-02", amount: 9 },
];

const route = {
    params: {
        order: {
        id: 1,
        name: 'Test Testsson',
        address: 'Testgatan 1',
        zip: '12345',
        city: 'Test',
        order_items: [
            {
                name: 'Tallrik',
                stock: 10,
                amount: 7,
                location: 'A1'
            },
            {
                name: 'Gaffel',
                stock: 10,
                amount: 8,
                location: 'A2'
            }
        ]
    }}
};

const navigation  = () => false;

test('PickList should contain details of an order', async () => {
    const { getByText } = render(<PickList navigation = {navigation} route={route} />);

    const Name = await getByText('Test Testsson', { exact: false });
    const Address = await getByText('Testgatan 1', { exact: false });
    const Zip = await getByText('12345', { exact: false });
    const ProdOne = await getByText('Tallrik', { exact: false });
    const Location = await getByText('A1', { exact: false });
    const ProdTwo = await getByText('Gaffel', { exact: false });
    const LocationTwo = await getByText('A2', { exact: false });
    const Amount = await getByText('7', { exact: false });
    const AmountTwo = await getByText('8', { exact: false });

    expect(Name).toBeDefined();
    expect(Address).toBeDefined();
    expect(Zip).toBeDefined();
    expect(ProdOne).toBeDefined();
    expect(Location).toBeDefined();
    expect(ProdTwo).toBeDefined();
    expect(LocationTwo).toBeDefined();
    expect(Amount).toBeDefined();
    expect(AmountTwo).toBeDefined();
});


test('A button should exist', async () => {
    const { getAllByA11yLabel} = render(<PickList navigation = {navigation} route={route} />);

    const a11yLabel = "Plocka order genom att trycka";
    const submitButton = getAllByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();
});