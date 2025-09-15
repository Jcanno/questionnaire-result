export enum QuestionType {
  TEXT = 'text',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
}

const idealPartnerTraitsOptions = [{
  label: '爱S',
  value: 'A',
}, {
  label: '品格',
  value: 'B',
}, {
  label: '事业',
  value: 'C',
}, {
  label: '外貌',
  value: 'D',
}, {
  label: '原生家庭',
  value: 'E',
}, {
  label: '价值观',
  value: 'F',
}, {
  label: '服shi异象',
  value: 'G',
}, {
  label: '兴趣爱好',
  value: 'H',
  }]

const mainChallengeOptions = [{
  label: '来自家庭的压力',
  value: 'A',
}, {
  label: 'JH圈子小',
  value: 'B',
}, {
  label: '对未来的不确定',
  value: 'C',
}, {
  label: '如何等待',
  value: 'D',
}, {
  label: '择偶标准不清晰',
  value: 'E',
}, {
  label: '如何确定合适的人',
  value: 'F',
  }]

const prepareForFutureMarriageOptions = [{
  label: '灵命成长',
  value: 'A',
}, {
  label: '心智成熟',
  value: 'B',
}, {
  label: '人际关系',
  value: 'C',
}, {
  label: '生活技能',
  value: 'D',
  }]

const challengeInLoveOptions = [{
  label: '沟通',
  value: 'A',
}, {
  label: '肢体界限',
  value: 'B',
}, {
  label: '原生家庭',
  value: 'C',
}, {
  label: '未来规划',
  value: 'D',
}]

const conflictResolutionOptions = [{
  label: '一起dg',
  value: 'A',
}, {
  label: '坦诚沟通',
  value: 'B',
}, {
  label: '寻求木者/长辈帮助',
  value: 'C',
}]

const challengeInMarriageOptions = [{
  label: '沟通',
  value: 'A',
}, {
  label: '经济',
  value: 'B',
}, {
  label: '原生家庭',
  value: 'C',
}, {
  label: '家务分配',
  value: 'D',
}, {
  label: '性生活',
  value: 'E',
}]

const responsibleForLingLifeOptions = [{
  label: '一起读话语和dg',
  value: 'A',
}, {
  label: '参加JH活动',
  value: 'B',
  }]

const challengeInChildEducationOptions = [{
  label: '管教方式',
  value: 'A',
}, {
  label: 'XY启蒙',
  value: 'B',
}, {
  label: '学业压力',
  value: 'C',
}, {
  label: '沟通',
  value: 'D',
  }]

const xyPrincipleInChildEducationOptions = [{
  label: '饭前dg',
  value: 'A',
}, {
  label: '睡前故事',
  value: 'B',
}, {
  label: '分享SJ故事',
  value: 'C',
  }]

const marriageStatusOptions = [{
  label: '未婚，无恋爱对象',
  value: 'A',
}, {
  label: '未婚，有恋爱对象',
  value: 'B',
}, {
  label: '已婚',
  value: 'C',
}]
  
const ageOptions = [{
  label: '18-25岁',
  value: 'A',
}, {
  label: '26-35岁',
  value: 'B',
}, {
  label: '36-45岁',
  value: 'C',
}, {
  label: '46岁及以上',
  value: 'D',
}]
  
const genderOptions = [{
  label: '男',
  value: 'A',
}, {
  label: '女',
  value: 'B',
}]


export const QUESTIONNAIRE_QUESTION_LIST = [
  {
    id: 1,
    question: '您的性别是？',
    type: QuestionType.RADIO,
    toId: 2,
    options: genderOptions,
    label: '性别',
    key: 'gender',
    render: (value: string) => {
      if (!value) return '-'
      return genderOptions.find((option: any) => option.value === value)?.label
    },
  },
  {
    id: 2,
    question: '您的年龄段是？',
    type: QuestionType.RADIO,
    toId: 3,
    options:ageOptions,
    label: '年龄段',
    key: 'age',
    render: (value: string) => {
      if (!value) return '-'
      return ageOptions.find((option: any) => option.value === value)?.label
    },
  },
  {
    id: 3,
    question: '您目前的婚恋状况是？',
    type: QuestionType.RADIO,
    toId: {
      A: 4,
      B: 7,
      C: 10,
    },
    idMap: {
      A: [1, 2, 3, 4, 5, 6, 17],
      B: [1, 2, 3, 7, 8, 9, 17],
      C: [10, 11, 12, 13, 14, 15, 16, 17]
    },
    options: marriageStatusOptions,
    label: '婚恋状况',
    key: 'marriageStatus',
    render: (value: string) => {
      if (!value) return '-'
      return marriageStatusOptions.find((option: any) => option.value === value)?.label
    },
  },
  {
    id: 4,
    question: '在你看来，一个理想的伴侣最重要的三个特质是什么？（请多选）',
    type: QuestionType.CHECKBOX,
    toId: 5,
    options: idealPartnerTraitsOptions,
    label: '理想的伴侣最重要的三个特质',
    key: 'idealPartnerTraits',
    render: (value: string[]) => {  
      if (!value) return '-'
      return value.map((v: string) => {
        return idealPartnerTraitsOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 5,
    question: '你目前单身，最主要的困惑或挑战是什么？（请多选）',
    type: QuestionType.CHECKBOX,
    toId: 6,
    options: mainChallengeOptions,
    label: '目前单身最主要的困惑或挑战',
    key: 'mainChallenge',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return mainChallengeOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 6,
    question: '你认为单身阶段，自己可以在哪些方面为未来的婚姻做预备？（请多选）',
    type: QuestionType.CHECKBOX,
    toId: 17,
    options: prepareForFutureMarriageOptions,
    label: '目前单身可以为未来的婚姻做预备的方面',
    key: 'prepareForFutureMarriage',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return prepareForFutureMarriageOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 7,
    question: '你和你的伴侣在XY上是否一致？你们如何共同追求属Ling成长？',
    type: QuestionType.TEXTAREA,
    toId: 8,
    label: '你和你的伴侣在XY上是否一致？你们如何共同追求属Ling成长',
    key: 'xyConsistent',
    render: (value: string) => {
      if (!value) return '-'
      return value
    },
  },
  {
    id: 8,
    question: '你们在恋爱中，最常遇到的挑战是什么？（请多选）',
    type: QuestionType.CHECKBOX,
    toId: 9,
    options: challengeInLoveOptions,
    label: '你们在恋爱中，最常遇到的挑战是什么？',
    key: 'challengeInLove',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return challengeInLoveOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 9,
    question: '你们会如何处理和解决冲突？（请多选）',
    type: QuestionType.CHECKBOX,
    toId: 17,
    options: conflictResolutionOptions,
    label: '你们会如何处理和解决冲突？',
    key: 'conflictResolution',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return conflictResolutionOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 10,
    question: '在你和配偶的婚姻中，最主要的挑战是什么？',
    type: QuestionType.CHECKBOX,
    toId: 11,
    options: challengeInMarriageOptions,
    label: '在你和配偶的婚姻中，最主要的挑战是什么？',
    key: 'challengeInMarriage',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return challengeInMarriageOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 11,
    question: '你认为在婚姻中，最需要S的恩典来帮助你克服的是哪一点？',
    type: QuestionType.TEXTAREA,
    toId: 12,
    label: '你认为在婚姻中，最需要S的恩典来帮助你克服的是哪一点？',
    key: 'overcomeChallenge',
    render: (value: string) => {
      if (!value) return '-'
      return value
    },
  },
  {
    id: 12,
    question: '你们如何共同为家庭的属Ling生活负责？',
    type: QuestionType.CHECKBOX,
    toId: 13,
    options: responsibleForLingLifeOptions,
    label: '你们如何共同为家庭的属Ling生活负责？',
    key: 'responsibleForLingLife',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return responsibleForLingLifeOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 13,
    question: '在你们的婚姻中，你最感恩的是什么？',
    type: QuestionType.TEXTAREA,
    toId: 14,
    label: '在你们的婚姻中，你最感恩的是什么？',
    key: 'gratefulFor',
    render: (value: string) => {
      if (!value) return '-'
      return value
    },
  },
  {
    id: 14,
    question: '在教养孩子方面，你们家庭最主要的挑战是什么？',
    type: QuestionType.CHECKBOX,
    toId: 15,
    options: challengeInChildEducationOptions,
    label: '在教养孩子方面，你们家庭最主要的挑战是什么？',
    key: 'challengeInChildEducation',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return challengeInChildEducationOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 15,
    question: '你们是如何将XY原则融入到孩子的日常教育中的？',
    type: QuestionType.CHECKBOX,
    toId: 16,
    options: xyPrincipleInChildEducationOptions,
    label: '你们是如何将XY原则融入到孩子的日常教育中的？',
    key: 'xyPrincipleInChildEducation',
    render: (value: string[]) => {
      if (!value) return '-'
      return value.map((v: string) => {
        return xyPrincipleInChildEducationOptions.find((option: any) => option.value === v)?.label
      }).join(', ')
    },
  },
  {
    id: 16,
    question: '你如何平衡夫妻关系与亲子关系？',
    type: QuestionType.TEXTAREA,
    toId: 17,
    label: '你如何平衡夫妻关系与亲子关系？',
    key: 'balanceBetweenMarriageAndChild',
    render: (value: string) => {
      if (!value) return '-'
      return value
    },
  },
  {
    id: 17,
    question: '你对本次讲座有什么具体的期待？或者你最想听讲员分享哪方面的真理或经验？',
    type: QuestionType.TEXTAREA,
    isLast: true,
    label: '你对本次讲座有什么具体的期待？或者你最想听讲员分享哪方面的真理或经验？',
    key: 'expectationForLecture',
    render: (value: string) => {
      if (!value) return '-'
      return value
    },
  }
]