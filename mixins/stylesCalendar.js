export const stylesCalendar = {
  data () {
    return {
      disabledAttribute: {
        contentStyle: {
          opacity: 0.2,
          textDecoration: 'line-through'
        },
        contentHoverStyle: {
          cursor: 'default',
          backgroundColor: 'transparent'
        }
      },
      datePickerDesktopStyle: {
        wrapper: {
          color: 'rgb(42, 42, 42)',
          borderTop: '10px solid white',
          borderBottom: '8px solid white',
          borderLeft: '15px solid white',
          borderRight: '15px solid white',
          background: 'white',
          boxShadow: '1px 1px 25px 2px rgba(0,0,0,0.1)'
        },
        header: {
          padding: '10px 9px 0px 9px'
        },
        headerArrows: {
          fontSize: '1.55rem'
        },
        headerTitle: {
          fontSize: '17px',
          fontWeight: '700'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontWeight: '600',
          padding: '21px 5px 6px 5px'
        },
        dayCell: {
          height: '35px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '14px'
        },
        dayCellNotInMonth: {
          opacity: 0
        },
        dayPopoverContent: {
          background: '#00D8C7',
          color: 'white',
          border: 'none'
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      },
      calendarDesktopStyle: {
        wrapper: {
          color: 'rgb(42, 42, 42)',
          margin: '10px 0px 0 0px',
          padding: '10px 0px 0 0px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px'
        },
        headerArrows: {
          fontSize: '1.55rem'
        },
        headerTitle: {
          fontSize: '17px',
          fontWeight: '600'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontSize: '15px',
          fontWeight: '600',
          padding: '14px 5px 6px 5px'
        },
        dayCell: {
          height: '38px'
        },
        dayContent: {
          fontWeight: '400',
          fontSize: '15px'
        },
        dayCellNotInMonth: {
          opacity: 0
        },
        verticalDivider: {
          borderLeft: 'none'
        }
      }
    }
  }
}