export const stylesCalendar = {
  data () {
    return {
      disabledAttribute: {
        contentStyle: {
          opacity: 0.2,
          fontWeight: '400',
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
          color: '#161616',
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
          color: '#161616',
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
          color: '#161616',
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
          color: '#161616',
          fontSize: '16px',
          fontWeight: '400',
          padding: '21px 5px 6px 5px'
        },
        dayCell: {
          height: '60px',
          padding: '13px 0'
        },
        dayContent: {
          fontWeight: '500',
          fontSize: '17px'
        },
        dayCellNotInMonth: {
          opacity: 0
        }
      },
      /* ____________________ Calendar Desktop ____________________ */
      calendarDesktopStyle: {
        wrapper: {
          color: '#161616',
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
          color: '#161616',
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
      },
      /* ____________________ Calendar Mobile ____________________ */
      calendarMobileStyle: {
        wrapper: {
          color: '#161616',
          margin: '10px 0px 0 0px',
          padding: '10px 0px 0 0px',
          background: 'white',
          width: '100%'
        },
        header: {
          padding: '0 9px'
        },
        headerArrows: {
          fontSize: '1.8rem',
          margin: '0 .9rem'
        },
        headerTitle: {
          fontSize: '17px',
          fontWeight: '600'
        },
        weekdays: {
          color: '#161616',
          fontSize: '15px',
          fontWeight: '500',
          padding: '16px 10px 6px 10px'
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
