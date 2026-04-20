export default interface AlertSnackBarProps {
    severity: 'error' | 'info' | 'success' | 'warning',
    message: string,
    hideduration?: number,
    location?: 'bottom | top'
}