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
      /* ____________________ Date Picker Desktop ____________________ */
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
          fontSize: '18px',
          fontWeight: '400'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontWeight: '400',
          padding: '21px 5px 6px 5px'
        },
        dayCell: {
          padding: '4px 0'
        },
        dayContent: {
          fontWeight: '500',
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
      /* ____________________ Date Picker Mobile ____________________ */
      datePickerMobileStyle: {
        wrapper: {
          color: 'rgb(42, 42, 42)',
          border: '0',
          padding: '0 4px',
          background: 'white'
        },
        header: {
          padding: '0'
        },
        headerArrows: {
          margin: '0 13px',
          fontSize: '2rem'
        },
        headerTitle: {
          fontSize: '21px',
          fontWeight: '700'
        },
        weekdays: {
          color: 'rgb(42, 42, 42)',
          fontSize: '15px',
          fontWeight: '400',
          padding: '21px 5px 6px 5px'
        },
        dayCell: {
          height: '53px',
          padding: '10px 0'
        },
        dayContent: {
          fontWeight: '600',
          fontSize: '16px'
        },
        dayCellNotInMonth: {
          opacity: 0
        }
      },
      /* ____________________ Calendar Desktop ____________________ */
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
          fontWeight: '500',
          padding: '14px 5px 6px 5px'
        },
        dayCell: {
          padding: '6px 0'
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
