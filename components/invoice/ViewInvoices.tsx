import { useState, useEffect } from 'react';
import { ScrollView, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Typography, Base } from '../../styles/index.js';
import invoiceModel from "../../models/invoices";
import Invoice from "../../interface/invoice";

export default function ViewInvoices({ route, navigation }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices())
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const listOfInvoices = allInvoices
        .map((invoice: Invoice, index) => {
            return <DataTable.Row key={index}>
                        <DataTable.Cell style={{flex: 11}} onPress={() => navigation.navigate(
                                            'SeeInvoice', {
                                            invoice: invoice
                                            })}>{invoice.name}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 2}}>{invoice.total_price}:-</DataTable.Cell>
                    </DataTable.Row>
        });

    return (
        <ScrollView style={Typography.main}>
            <Text style={Typography.h1}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Kund</DataTable.Title>
                    <DataTable.Title numeric>Summa</DataTable.Title>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>
            <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={() => navigation.navigate('CreateInvoice')}>
                <Text style={Base.loginText}>Skapa faktura</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
