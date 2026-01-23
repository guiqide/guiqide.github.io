// 主应用模块
import { DataManager } from './dataManager.js';
import { UIRenderer } from './uiRenderer.js';

class ScoreboardApp {
    constructor() {
        this.dataManager = new DataManager();
        this.uiRenderer = new UIRenderer(this.dataManager);
        this.init();
    }

    init() {
        // 初始渲染
        this.uiRenderer.render();
        
        // 绑定事件
        this.bindEvents();
    }

    bindEvents() {
        // 添加选手按钮
        const addPlayerBtn = document.getElementById('addPlayerBtn');
        addPlayerBtn.addEventListener('click', () => {
            this.addPlayer();
        });

        // 清空所有按钮
        const clearAllBtn = document.getElementById('clearAllBtn');
        clearAllBtn.addEventListener('click', () => {
            this.clearAll();
        });

        // 使用事件委托处理表格内的事件
        const playerList = document.getElementById('playerList');
        
        // 双击编辑
        playerList.addEventListener('dblclick', (e) => {
            const editableText = e.target.closest('.editable-text');
            if (editableText) {
                this.uiRenderer.startEdit(editableText);
            }
        });

        // 单击编辑（移动端友好）
        playerList.addEventListener('click', (e) => {
            const editableText = e.target.closest('.editable-text');
            if (editableText && !this.uiRenderer.editingCell) {
                // 添加一个小延迟，避免与双击冲突
                this.clickTimeout = setTimeout(() => {
                    this.uiRenderer.startEdit(editableText);
                }, 250);
            }
        });

        // 清除单击延迟（如果发生了双击）
        playerList.addEventListener('dblclick', () => {
            if (this.clickTimeout) {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = null;
            }
        });

        // 删除按钮
        playerList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                const playerId = parseInt(deleteBtn.dataset.playerId);
                this.deletePlayer(playerId);
            }
        });
    }

    // 添加选手
    addPlayer() {
        this.dataManager.addPlayer('', 0);
        this.uiRenderer.render();
        
        // 自动聚焦到新添加的选手姓名输入框
        setTimeout(() => {
            const rows = document.querySelectorAll('#playerList tr');
            if (rows.length > 0) {
                const lastRow = rows[rows.length - 1];
                const nameCell = lastRow.querySelector('.editable-text[data-field="name"]');
                if (nameCell) {
                    this.uiRenderer.startEdit(nameCell);
                }
            }
        }, 100);
    }

    // 删除选手
    deletePlayer(playerId) {
        if (confirm('确定要删除这位选手吗？')) {
            this.dataManager.deletePlayer(playerId);
            this.uiRenderer.render();
        }
    }

    // 清空所有数据
    clearAll() {
        if (this.dataManager.players.length === 0) {
            alert('当前没有数据可清空');
            return;
        }

        if (confirm('确定要清空所有选手数据吗？此操作不可恢复！')) {
            this.dataManager.clearAll();
            this.uiRenderer.render();
        }
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ScoreboardApp();
});
