import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip,  ResponsiveContainer } from 'recharts';

const Graph = ({changedValue}) => {

    const data = Object.entries(changedValue?.amount).map(([key, value]) => ({
        name:key,
        pv:value
      }));
      
  return (
    <div > 
   
    <div >
        <ResponsiveContainer width={600} height={300}>    <BarChart width={600} height={250} data={data}>
  <XAxis dataKey="name" />
  <YAxis tickLine={false}/>
  <Bar dataKey="pv" fill="#F0C3F1" barSize={30}/>
</BarChart></ResponsiveContainer>

</div>
     </div>
  )
}

export default Graph