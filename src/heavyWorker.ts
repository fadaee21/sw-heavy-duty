type MessageData = {
    data: string;
  };
  
  self.onmessage = (e: MessageData) => {
    if (e.data === 'start') {
      console.log('Worker started calculation...');
      let sum = 0;
      for (let i = 0; i < 5e9; i++) sum += i;
      
      console.log('Worker finished calculation, sending result...');
      self.postMessage(sum);
      
      // بستن Worker پس از ارسال نتیجه
      self.close();
    }
  };
  
  export default {} as typeof Worker & { new (): Worker };