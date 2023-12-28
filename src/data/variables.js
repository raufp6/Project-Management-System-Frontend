var status = []
status['incomplete'] = {
  title: 'In Complete',
  color: 'text-bamber-500 bg-bamber-50',
}
status['doing'] = {
  title: 'Doing',
  color: 'text-error-300 bg-error-50',
}
status['todo'] = {
  title: 'To Do',
  color: 'text-success-300 bg-success-50',
}
status['completed'] = {
  title: 'Completed',
  color: 'text-success-300 bg-success-50',
}
status['notstarted'] = {
  title: 'Not Started',
  color: 'text-bamber-500 bg-bamber-50',
}

var priority_data = []
priority_data['medium'] = {
  title: 'Medium',
  color: 'text-black bg-cyan-300',
}
priority_data['high'] = {
  title: 'High',
  color: 'text-bamber-500 bg-orange',
}
priority_data['low'] = {
  title: 'Low',
  color: 'text-error-300 bg-error-50',
}

export {priority_data,status}
