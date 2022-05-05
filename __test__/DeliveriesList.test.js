import { render } from '@testing-library/react-native';
import DeliveriesList from '../components/delivery/DeliveriesList';

const deliveries = [
    { product_name: "Sked", delivery_date: "2022-05-01", amount: 7 },
    { product_name: "Tallrik", delivery_date: "2022-05-02", amount: 9 },
];

const setDeliveries = () => false;
const route = false;
const navigation  = () => false;

test('Deliverit list should contain two deliveries with name, date and amount', async () => {
    const { getByText } = render(<DeliveriesList navigation = {navigation} route={route} test_deliveries={deliveries} setAllDeliveries={setDeliveries} />);

    const Name = await getByText('Sked', { exact: false });
    const Date = await getByText('2022-05-01', { exact: false });
    const Amount = await getByText('7', { exact: false });
    const NameTwo = await getByText('Tallrik', { exact: false });
    const DateTwo = await getByText('2022-05-02', { exact: false });
    const AmountTwo = await getByText('9', { exact: false });

    expect(Name).toBeDefined();
    expect(Date).toBeDefined();
    expect(Amount).toBeDefined();
    expect(NameTwo).toBeDefined();
    expect(DateTwo).toBeDefined();
    expect(AmountTwo).toBeDefined();

});

test('Title should exist with text Inleveranser', async () => {
    const title = "Inleveranser";
    const { getByText} = render(<DeliveriesList navigation = {navigation} route={route} test_deliveries={deliveries} setAllDeliveries={setDeliveries} />);

    const titleElement = await getByText(title);

    expect(titleElement).toBeDefined();
});

test('A button should exist', async () => {
    const { getAllByA11yLabel} = render(<DeliveriesList navigation = {navigation} route={route} test_deliveries={deliveries} setAllDeliveries={setDeliveries} />);

    const a11yLabel = "Skapa ny inleverans genom att trycka";
    const submitButton = getAllByA11yLabel(a11yLabel);

    expect(submitButton).toBeDefined();
});