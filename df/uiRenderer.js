// UI渲染模块
export class UIRenderer {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.playerListEl = document.getElementById('playerList');
        this.emptyStateEl = document.getElementById('emptyState');
        this.editingCell = null;
    }

    // 渲染整个列表
    render() {
        const players = this.dataManager.getSortedPlayers();
        
        if (players.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();
        this.playerListEl.innerHTML = '';
        
        players.forEach((player, index) => {
            const row = this.createPlayerRow(player, index + 1);
            this.playerListEl.appendChild(row);
        });
    }

    // 创建选手行
    createPlayerRow(player, rank) {
        const tr = document.createElement('tr');
        tr.dataset.playerId = player.id;
        
        // 排名列
        const rankTd = document.createElement('td');
        rankTd.className = 'rank-col';
        rankTd.innerHTML = `<span class="rank ${this.getRankClass(rank)}">${rank}</span>`;
        
        // 姓名列
        const nameTd = document.createElement('td');
        nameTd.className = 'name-col';
        nameTd.innerHTML = this.createEditableCell(player.id, 'name', player.name || '未命名选手', 'player-name');
        
        // 成绩列
        const scoreTd = document.createElement('td');
        scoreTd.className = 'score-col';
        const scoreDisplay = this.dataManager.formatScore(player.score);
        scoreTd.innerHTML = this.createEditableCell(player.id, 'score', scoreDisplay, 'player-score');
        
        // 操作列
        const actionTd = document.createElement('td');
        actionTd.className = 'action-col';
        actionTd.innerHTML = `
            <button class="delete-btn" data-player-id="${player.id}">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        `;
        
        tr.appendChild(rankTd);
        tr.appendChild(nameTd);
        tr.appendChild(scoreTd);
        tr.appendChild(actionTd);
        
        return tr;
    }

    // 创建可编辑单元格
    createEditableCell(playerId, field, value, className = '') {
        const displayValue = value || (field === 'name' ? '点击输入姓名' : '点击输入成绩');
        const placeholder = field === 'name' ? '请输入选手姓名' : '请输入成绩（支持：100、10万、100万、1000万）';
        
        return `
            <div class="editable-text ${className}" 
                 data-player-id="${playerId}" 
                 data-field="${field}"
                 data-value="${field === 'score' ? this.getPlayerScore(playerId) : value}">
                ${displayValue}
            </div>
        `;
    }

    // 获取选手原始成绩
    getPlayerScore(playerId) {
        const player = this.dataManager.players.find(p => p.id === playerId);
        return player ? player.score : 0;
    }

    // 获取排名样式类
    getRankClass(rank) {
        if (rank === 1) return 'rank-1';
        if (rank === 2) return 'rank-2';
        if (rank === 3) return 'rank-3';
        return 'rank-other';
    }

    // 显示空状态
    showEmptyState() {
        this.playerListEl.innerHTML = '';
        this.emptyStateEl.classList.add('show');
    }

    // 隐藏空状态
    hideEmptyState() {
        this.emptyStateEl.classList.remove('show');
    }

    // 开始编辑单元格
    startEdit(element) {
        if (this.editingCell) {
            this.cancelEdit();
        }

        const playerId = parseInt(element.dataset.playerId);
        const field = element.dataset.field;
        const currentValue = element.dataset.value || '';
        
        this.editingCell = {
            element,
            playerId,
            field,
            originalValue: currentValue
        };

        const placeholder = field === 'name' ? '请输入选手姓名' : '请输入成绩（支持：100、10万、100万、1000万）';
        const inputType = field === 'score' ? 'text' : 'text';
        
        const input = document.createElement('input');
        input.type = inputType;
        input.className = 'editable-input';
        input.value = currentValue;
        input.placeholder = placeholder;
        
        element.innerHTML = '';
        element.appendChild(input);
        input.focus();
        input.select();

        // 回车确认
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.confirmEdit(input.value);
            } else if (e.key === 'Escape') {
                this.cancelEdit();
            }
        });

        // 失去焦点时确认
        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (this.editingCell && this.editingCell.element === element) {
                    this.confirmEdit(input.value);
                }
            }, 200);
        });
    }

    // 确认编辑
    confirmEdit(newValue) {
        if (!this.editingCell) return;

        const { playerId, field } = this.editingCell;
        
        // 更新数据
        this.dataManager.updatePlayer(playerId, field, newValue);
        
        // 清除编辑状态
        this.editingCell = null;
        
        // 重新渲染
        this.render();
    }

    // 取消编辑
    cancelEdit() {
        if (!this.editingCell) return;

        this.editingCell = null;
        this.render();
    }
}
