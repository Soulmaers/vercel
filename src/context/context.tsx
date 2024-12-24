

import CalculateStruktura from '../jsClasses/CalculateStruktura'
import React, { useEffect, useState, createContext, ReactNode } from 'react'
import { GlobalDataOP, ManagersDataOP, GlobalDataTM, ManagersDataTM } from '../interfaces/interfaces'

interface DashboardsData {
    opStruktura: {
        globalData: GlobalDataOP;
        managersData: ManagersDataOP[];
    };
    tmStruktura: {
        globalData: GlobalDataTM;
        managersData: ManagersDataTM[];
    };
}

interface DashBoardProvider {
    children: ReactNode
}
export const ContextStateDataGoggle = createContext<DashboardsData | null>(null)




const DashboardDataprovider: React.FC<DashBoardProvider> = ({ children }) => {

    const [data, setData] = useState<DashboardsData | null>(null)
    useEffect(() => {
        const sheetkey = process.env.REACT_APP_SHEET_ID
        const apikey = process.env.REACT_APP_GOOGLE_API_KEY
        const sheetName = `ОП ${getDay()}`;
        const sheetNameTM = `ТМ ${getDay()}`;

        const fetchFunction = async () => {

            try {
                const [responseOP, responseTM] = await Promise.all([
                    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetkey}/values/${`${sheetName}!A1:Z`}?key=${apikey}`),
                    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetkey}/values/${`${sheetNameTM}!A1:Z`}?key=${apikey}`)
                ]);


                const dataOP = await responseOP.json();
                const dataTM = await responseTM.json();
                console.log('гугл')
                const instance = new CalculateStruktura([dataOP.values, dataTM.values])
                setData(instance.init())
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        // Функция для выполнения запроса
        async function getAccount() {
            try {
                //outgoing_call
                const time = 1734998469
                // Формируем URL для запроса

                //  const url = `https://info7licenzeru.amocrm.ru/api/v4/users`;
                const entity_id = 30921211
                const url = `https://info7licenzeru.amocrm.ru/api/v4/contacts/${entity_id}/notes`;
                // const url = `https://info7licenzeru.amocrm.ru/api/v4/events?filter[created_by]=9287458&filter[created_at]=${time}&filter[type]=outgoing_call`;
                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQxMWNiMDNlNmFkOWNhYjE4YmI1MDIxNTMxNTBmNmNlMmM5ZTcxZDEwZWUzOWMwYzY0ZjU2ZDE1YmE4NGI0ZmFkYTNhNGI4NTZhMjU4NjQyIn0.eyJhdWQiOiJiMzdhZWM0Yi1kZmUyLTQ0OTAtYmZkYy00NDI2MTczZjI0ZjUiLCJqdGkiOiJkMTFjYjAzZTZhZDljYWIxOGJiNTAyMTUzMTUwZjZjZTJjOWU3MWQxMGVlMzljMGM2NGY1NmQxNWJhODRiNGZhZGEzYTRiODU2YTI1ODY0MiIsImlhdCI6MTczNTAzOTM3NywibmJmIjoxNzM1MDM5Mzc3LCJleHAiOjE4OTI0MTkyMDAsInN1YiI6Ijc2MjIyNjAiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6Mjk4MTI2MzAsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSJdLCJoYXNoX3V1aWQiOiIwMDMzNGExYi1mMmFjLTRiZTctYTJhNi1kMzc0ZTYwMjQ1Y2MiLCJhcGlfZG9tYWluIjoiYXBpLWIuYW1vY3JtLnJ1In0.ey9CRrqGkvgAQubREQcUgiWVWbNieXXqbBA9Mc3-mZhxstjDQ2v5eO46j195jkn5oEe4LvkX0Lw_JJfUlAtsSNYJGvf-_-knB2H4VZx2c-6Axv_HOltMj79ZL2lX1ulUv4cQ20lIwQdf2sJZVvR0A5133DPskfubdN8YXNdaiF76W6120UxWB2vCCawHskV2o0FZpJux-WqSzpSpevm4LwCXybtxu9oJ8KJ__FfCFuH-Wj-hV2zgDit01FP1GpuFz6MhQ4tf3oosbu4ChaAIrVebC8LhLOV3_d-Dsi06Wp9Ccb6LmpbMRkN1_l25lcVt1BlnMkm5T4OhqDeVDd-BrA'
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Указываем тип содержимого, если это необходимо
                };

                const response = await fetch(url, {
                    method: 'GET', // Метод запроса
                    headers: headers
                });
                console.log('амо')
                // Проверяем статус ответа
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                }

                // Парсим ответ в формате JSON
                const data = await response.json();
                //    console.log(F); // Выводим данные в консоль
                console.log(data._embedded.notes[10])
                //  console.log(data._embedded.events.forEach(e => console.log(e.entity_type)))

            } catch (error) {
                console.error('Произошла ошибка при выполнении запроса:', error);
            }
        }
        fetchFunction();
        getAccount()
        const interval = setInterval(fetchFunction, 60000);
        return () => clearInterval(interval);
    }, []);


    return (
        <ContextStateDataGoggle.Provider value={data}>
            {children}
        </ContextStateDataGoggle.Provider>
    )
}



function getDay() {
    const unixTime = Math.floor(new Date().getTime() / 1000)
    const date = new Date(unixTime * 1000);
    const monthName = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear()
    return `${monthName} ${year}`
}
export default DashboardDataprovider