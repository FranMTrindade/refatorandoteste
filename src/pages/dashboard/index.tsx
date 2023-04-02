import { useEffect, useState } from 'react';
import { api } from '@/src/services/api';
import { Header } from '@/src/components/Header';
import axios from 'axios';
import Head from "next/head";
import styles from './styles.module.scss'

interface Order {
  id: number;
  PC17Pedido: string;
  PC17DTEmi: string;
  data: string;
  numero: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await api.get('/orders')
      const ordersArray = response.data.Orders as Order[];
      setOrders(ordersArray);
    }
  
    fetchOrders();
  }, []);
  
  const ordersByYearAndMonth = orders.reduce((acc, order) => {
    const orderDate = new Date(order.PC17DTEmi);
    const year = orderDate.getFullYear();
    const month = orderDate.getMonth();
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(order);
    
    return acc;
  }, {} as { [year: number]: { [month: number]: Order[] } });
  
  return (
    <>

    <Head>
      <title>Elanto - Dashboard</title>
    </Head>
     
      <Header />
      
      <div>
        {Object.entries(ordersByYearAndMonth).map(([year, ordersByMonth]) => (
          <div key={year}>
            <h2 className={styles.year}>{year}</h2>
            <table className={styles.table}>
            <thead className={styles.line}>
                <tr>
                  <th>Mês</th>
                  <th>Qnt. Vendas</th>
                  <th>Dia pedido</th>
                  <th>ID dos Pedidos</th>
                </tr>
              </thead>
              <tbody className={styles.colum}>
                {Object.entries(ordersByMonth).map(([month, orders]) => (
                  <tr key={`${year}-${month}`}>
                    <td className={styles.columMonth}>{new Date(parseInt(year), parseInt(month)).toLocaleString('default', { month: 'short' }).toUpperCase()}</td>
                    <td className={styles.columOrders}>{orders.length}</td>
                    <td className={styles.columDay}>{orders.map(order => new Date(order.PC17DTEmi).getDate()).join(', ')}</td>
                    <td className={styles.columId}>{orders.map(order => order.PC17Pedido).join(' - ')}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
