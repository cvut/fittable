/**
 * React component
 * @author Marián
 */

import Toggleable from './Toggleable.component';

export default class WeekSwitcher extends Toggleable
{
    /**
     * Renders the component
     */
    render()
    {
        return <div className="week-switcher hide" ref="rootEl">
            <div className="row selector semester-selector">
                <div className="column small-3 gr-go">
                    <a href="#"><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                    B142 LETNÍ
                </div>
                <div className="column small-3 gr-go">
                    <a href="#"><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            <div className="row selector month-selector">
                <div className="column small-3 gr-go">
                    <a href="#"><i className="fa fa-chevron-left"></i></a>
                </div>
                <div className="column small-6 active-item">
                    květen
                </div>
                <div className="column small-3 gr-go">
                    <a href="#"><i className="fa fa-chevron-right"></i></a>
                </div>
            </div>
            <div className="row selector week-selector">
                <div className="column small-12">
                    <a href="#">
                        <div className="day in-other">27</div>
                        <div className="day in-other">28</div>
                        <div className="day in-other">29</div>
                        <div className="day in-other">30</div>
                        <div className="day">1</div>
                        <div className="day">2</div>
                        <div className="day">3</div>
                    </a>
                </div>
            </div>
            <div className="row selector week-selector">
                <div className="column small-12">
                    <a href="#">
                        <div className="day">4</div>
                        <div className="day">5</div>
                        <div className="day">6</div>
                        <div className="day">7</div>
                        <div className="day">8</div>
                        <div className="day">9</div>
                        <div className="day">10</div>
                    </a>
                </div>
            </div>
            <div className="row selector week-selector">
                <div className="column small-12">
                    <a href="#">
                        <div className="day">11</div>
                        <div className="day">12</div>
                        <div className="day">13</div>
                        <div className="day">14</div>
                        <div className="day">15</div>
                        <div className="day">16</div>
                        <div className="day">17</div>
                    </a>
                </div>
            </div>
            <div className="row selector week-selector active-week">
                <div className="column small-12">
                    <a href="#">
                        <div className="day">18</div>
                        <div className="day">19</div>
                        <div className="day">20</div>
                        <div className="day">21</div>
                        <div className="day">22</div>
                        <div className="day">23</div>
                        <div className="day">24</div>
                    </a>
                </div>
            </div>
            <div className="row selector week-selector">
                <div className="column small-12">
                    <a href="#">
                        <div className="day">25</div>
                        <div className="day">26</div>
                        <div className="day">27</div>
                        <div className="day">28</div>
                        <div className="day">29</div>
                        <div className="day">30</div>
                        <div className="day">31</div>
                    </a>
                </div>
            </div>
        </div>;
    }
}
