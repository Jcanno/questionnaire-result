import { 
  Layout, 
  Card, 
  Space,
  Table,
  Button,
  message,
  Dropdown,
} from 'antd'
import { DownloadOutlined, FileExcelOutlined, FileTextOutlined } from '@ant-design/icons'

import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { decrypt } from './utils'
import { QUESTIONNAIRE_QUESTION_LIST } from './constants'
import { exportToExcel, exportToCSV, exportToJSON } from './utils/excelExport'

const { Content } = Layout

const API_KEY = 'zI3HIeAbth8nzNBdvUAAthQX'


function App() {
  const [recordData, setRecordData] = useState([])

  // 处理问卷数据，将选项值转换为可读文本
  const processQuestionnaireData = (data: any[], index: number) => {
    if (!data || !Array.isArray(data)) return data

    const processedData: any = {key: index} as any

    (data as any[]).forEach((item: any) => {
      QUESTIONNAIRE_QUESTION_LIST.forEach((question) => {
        if (question.id === item.questionId && question.key) {

          if (question.type === 'checkbox') {
            processedData[question.key] = [...(item.answer?.checkBox || []), item.answer?.text || ''].filter(Boolean)
          } else {
            processedData[question.key] = item.answer
          }
          
        }
      })
    })

    return processedData
  }

  // 获取数据
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://textdb.online/${API_KEY}`, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })

      console.log('response', response);

      const newRecordKeys = response.data ? response.data.split(',') : []
      
      const allRecordDataPromises = newRecordKeys.map((key: string) => {
        return axios.get(`https://textdb.online/${key}`, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
      })

      const allRecordData: any = await Promise.all(allRecordDataPromises)
      const rawData = allRecordData
        .map((data: any) => decrypt(data.data))
        .filter((item: any) => item !== null) // 过滤掉解密失败的数据
      
      console.log('raw data', rawData);

      const processedData = rawData.map((item: any, index: number) => processQuestionnaireData(item, index))
      console.log('processed data', processedData);
      
      setRecordData(processedData)
      
    } catch (error) {
      console.error('Fetch data error:', error)
    }
  }

  // 获取数据
  useEffect(() => {
    fetchData()
  }, [])

  // 导出Excel
  const handleExportExcel = () => {
    if (recordData.length === 0) {
      message.warning('没有数据可导出')
      return
    }
    
    const success = exportToExcel(recordData, '问卷数据')
    if (success) {
      message.success('Excel文件导出成功！')
    } else {
      message.error('Excel文件导出失败！')
    }
  }

  // 导出CSV
  const handleExportCSV = () => {
    if (recordData.length === 0) {
      message.warning('没有数据可导出')
      return
    }
    
    const success = exportToCSV(recordData, '问卷数据')
    if (success) {
      message.success('CSV文件导出成功！')
    } else {
      message.error('CSV文件导出失败！')
    }
  }

  // 导出JSON
  const handleExportJSON = () => {
    if (recordData.length === 0) {
      message.warning('没有数据可导出')
      return
    }
    
    const success = exportToJSON(recordData, '问卷数据')
    if (success) {
      message.success('JSON文件导出成功！')
    } else {
      message.error('JSON文件导出失败！')
    }
  }

  // 导出菜单项
  const exportMenuItems = [
    {
      key: 'excel',
      label: '导出Excel',
      icon: <FileExcelOutlined />,
      onClick: handleExportExcel,
    },
    {
      key: 'csv',
      label: '导出CSV',
      icon: <FileTextOutlined />,
      onClick: handleExportCSV,
    },
    {
      key: 'json',
      label: '导出JSON',
      icon: <FileTextOutlined />,
      onClick: handleExportJSON,
    },
  ]

  const columns = QUESTIONNAIRE_QUESTION_LIST.map((question) => {
    return {
      title: question.label,
      dataIndex: question.key,
      key: question.key,
      render: (value: any) => {
        return question.render ? question.render(value) : value
      },
    }
  })

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          <Card 
            title={`问卷数据列表 (共 ${recordData.length} 条记录)`} 
            style={{ marginTop: 16 }}
            extra={
              <Space>
                <Button 
                  icon={<DownloadOutlined />} 
                  onClick={fetchData}
                  loading={false}
                >
                  刷新数据
                </Button>
                <Dropdown
                  menu={{ items: exportMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Button 
                    type="primary" 
                    icon={<DownloadOutlined />}
                    disabled={recordData.length === 0}
                  >
                    导出数据
                  </Button>
                </Dropdown>
              </Space>
            }
          >
            <Table 
              id='key'
              scroll={{ x: 2000, y: 600 }} 
              columns={columns} 
              dataSource={recordData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
              }}
              size="small"
              bordered
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
