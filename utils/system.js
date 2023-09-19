const os = require('os');

module.exports = {
    getSystemInfo(){
        let platform = os.type()
        let arch = os.arch()
        let cpu = os.cpus()
        let hostname = os.hostname()
        let serverUpTime = Math.floor( os.uptime() / 3600 )
        // Total Memory
        let totalmem = os.totalmem()
        let total_mem_in_kb = totalmem / 1024;
        let total_mem_in_mb = total_mem_in_kb / 1024;
        let total_mem_in_gb = total_mem_in_mb / 1024;
        total_mem_in_gb = Math.floor(total_mem_in_gb).toFixed(2);
        // Free Memory
        let freemem = os.freemem()
        let free_mem_in_kb = freemem / 1024;
        let free_mem_in_mb = free_mem_in_kb / 1024;
        let free_mem_in_gb = free_mem_in_mb / 1024;
        free_mem_in_gb = Math.floor(free_mem_in_gb).toFixed(2);
        free_mem_percentage = ((free_mem_in_gb * 100 / total_mem_in_gb) - total_mem_in_gb).toFixed(2)
        // 
        let zone = "N/A"
        let current_time = new Date().toLocaleString();
        let instance_id = "N/A";
        // 
        return {
            platform: platform,
            architecture:arch,
            cpus:cpu.length,
            cpu_model:cpu[0].model,
            hostname:hostname,
            freemem:`${total_mem_in_gb - free_mem_in_gb} GB`,
            totalmem:`${total_mem_in_gb} GB`,
            free_mem_percentage:`${free_mem_percentage} %`,
            uptime:serverUpTime,
            env:process.env.NODE_ENV,
            zone:zone,
            datacenter:process.env.DATACENTER || "default",
            current_time:current_time,
            instance_id:instance_id,
        }
    }
}