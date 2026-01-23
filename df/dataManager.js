// 数据管理模块
export class DataManager {
    constructor() {
        this.storageKey = 'deltaForceScoreboard';
        this.players = this.loadData();
    }

    // 从localStorage加载数据
    loadData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('加载数据失败:', error);
            return [];
        }
    }

    // 保存数据到localStorage
    saveData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.players));
        } catch (error) {
            console.error('保存数据失败:', error);
        }
    }

    // 添加选手
    addPlayer(name = '', score = 0) {
        const player = {
            id: Date.now(),
            name: name,
            score: score
        };
        this.players.push(player);
        this.saveData();
        return player;
    }

    // 更新选手信息
    updatePlayer(id, field, value) {
        const player = this.players.find(p => p.id === id);
        if (player) {
            if (field === 'score') {
                player[field] = this.parseScore(value);
            } else {
                player[field] = value;
            }
            this.saveData();
            return true;
        }
        return false;
    }

    // 删除选手
    deletePlayer(id) {
        const index = this.players.findIndex(p => p.id === id);
        if (index !== -1) {
            this.players.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }

    // 清空所有数据
    clearAll() {
        this.players = [];
        this.saveData();
    }

    // 获取排序后的选手列表
    getSortedPlayers() {
        return [...this.players].sort((a, b) => b.score - a.score);
    }

    // 解析成绩（支持万、千万等单位）
    parseScore(value) {
        if (typeof value === 'number') return value;
        
        const str = String(value).trim();
        if (!str) return 0;

        // 移除所有空格和逗号
        let cleanStr = str.replace(/[\s,]/g, '');
        
        // 处理中文单位
        if (cleanStr.includes('千万')) {
            const num = parseFloat(cleanStr.replace('千万', ''));
            return isNaN(num) ? 0 : num * 10000000;
        } else if (cleanStr.includes('百万')) {
            const num = parseFloat(cleanStr.replace('百万', ''));
            return isNaN(num) ? 0 : num * 1000000;
        } else if (cleanStr.includes('万')) {
            const num = parseFloat(cleanStr.replace('万', ''));
            return isNaN(num) ? 0 : num * 10000;
        }
        
        // 直接解析数字
        const num = parseFloat(cleanStr);
        return isNaN(num) ? 0 : num;
    }

    // 格式化成绩显示
    formatScore(score) {
        if (!score || score === 0) return '0';
        
        if (score >= 10000000) {
            return (score / 10000000).toFixed(2) + ' 千万';
        } else if (score >= 1000000) {
            return (score / 1000000).toFixed(2) + ' 百万';
        } else if (score >= 10000) {
            return (score / 10000).toFixed(2) + ' 万';
        }
        
        return score.toLocaleString('zh-CN');
    }
}
