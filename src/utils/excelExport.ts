import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { QUESTIONNAIRE_QUESTION_LIST } from '../constants'

// 导出Excel文件
export const exportToExcel = (data: any[], filename: string = '问卷数据') => {
  try {
    if (data.length === 0) {
      console.warn('没有数据可导出')
      return false
    }

    // 创建工作表数据
    const worksheetData = data.map((item, index) => {
      const row: any = {
        '序号': index + 1,
        '提交时间': new Date().toLocaleString('zh-CN'),
      }
      
      // 根据问题列表添加列
      QUESTIONNAIRE_QUESTION_LIST.forEach(question => {
        const value = item[question.key]
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // 如果是数组，用逗号连接
            row[question.label] = value.map(v => question.options?.find(o => o.value === v)?.label || v).join(', ')
          } else if (typeof value === 'object') {
            // 如果是对象，转换为字符串
            row[question.label] = JSON.stringify(value)
          } else {
            row[question.label] = question.options ? question.options.find(o => o.value === value)?.label : String(value)
          }
        } else {
          row[question.label] = '-'
        }
      })
      
      return row
    })

    // 创建工作簿
    const workbook = XLSX.utils.book_new()
    
    // 创建工作表
    const worksheet = XLSX.utils.json_to_sheet(worksheetData)
    
    // 设置列宽
    const columnWidths = [
      { wch: 8 }, // 序号列
      { wch: 20 }, // 提交时间列
      ...QUESTIONNAIRE_QUESTION_LIST.map(question => ({ 
        wch: Math.max(15, Math.min(30, question.label.length + 5)) 
      })) // 问题列，根据标签长度调整宽度
    ]
    worksheet['!cols'] = columnWidths
    
    // 设置冻结窗格（冻结前两列）
    worksheet['!freeze'] = { xSplit: 2, ySplit: 1 }
    
    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, '问卷数据')
    
    // 添加统计信息工作表
    const statsData = [
      ['统计项目', '数值'],
      ['总记录数', data.length],
      ['导出时间', new Date().toLocaleString('zh-CN')],
      ['问题数量', QUESTIONNAIRE_QUESTION_LIST.length],
    ]
    const statsWorksheet = XLSX.utils.aoa_to_sheet(statsData)
    statsWorksheet['!cols'] = [{ wch: 15 }, { wch: 20 }]
    XLSX.utils.book_append_sheet(workbook, statsWorksheet, '统计信息')
    
    // 生成Excel文件
    const excelBuffer = XLSX.write(workbook, { 
      bookType: 'xlsx', 
      type: 'array',
      compression: true // 启用压缩
    })
    
    // 创建Blob并下载
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`
    saveAs(blob, fileName)
    
    return true
  } catch (error) {
    console.error('导出Excel失败:', error)
    return false
  }
}

// 导出CSV文件（备用方案）
export const exportToCSV = (data: any[], filename: string = '问卷数据') => {
  try {
    if (data.length === 0) {
      console.warn('没有数据可导出')
      return false
    }

    // 创建表头
    const headers = ['序号', '提交时间', ...QUESTIONNAIRE_QUESTION_LIST.map(q => q.label)]
    
    // 创建CSV内容
    const csvContent = [
      headers.join(','),
      ...data.map((item, index) => {
        const row = [
          index + 1,
          new Date().toLocaleString('zh-CN'),
          ...QUESTIONNAIRE_QUESTION_LIST.map(question => {
            const value = item[question.key]
            if (value !== undefined && value !== null) {
              if (Array.isArray(value)) {
                return `"${value.join(', ')}"`
              } else if (typeof value === 'object') {
                return `"${JSON.stringify(value).replace(/"/g, '""')}"`
              } else {
                return `"${String(value).replace(/"/g, '""')}"`
              }
            }
            return '"-"'
          })
        ]
        return row.join(',')
      })
    ].join('\n')

    // 创建Blob并下载
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    saveAs(blob, fileName)
    
    return true
  } catch (error) {
    console.error('导出CSV失败:', error)
    return false
  }
}

// 导出JSON文件（用于数据备份）
export const exportToJSON = (data: any[], filename: string = '问卷数据') => {
  try {
    if (data.length === 0) {
      console.warn('没有数据可导出')
      return false
    }

    const exportData = {
      exportTime: new Date().toISOString(),
      totalRecords: data.length,
      questions: QUESTIONNAIRE_QUESTION_LIST.map(q => ({
        id: q.id,
        label: q.label,
        key: q.key,
        type: q.type
      })),
      data: data
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const fileName = `${filename}_${new Date().toISOString().split('T')[0]}.json`
    saveAs(blob, fileName)
    
    return true
  } catch (error) {
    console.error('导出JSON失败:', error)
    return false
  }
}
